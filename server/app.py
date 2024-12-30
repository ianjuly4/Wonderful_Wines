from flask import Flask, render_template, request, make_response, session
from flask_restful import Api, Resource
from flask_cors import CORS
from flask_migrate import Migrate
from dotenv import load_dotenv
from models import Wine, Review, User
from config import app, db, bcrypt
import os


load_dotenv()


app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
)


app.secret_key = os.getenv('SECRET_KEY', "b'\x1f\r\xa4\xfa\x1f\x17\xf6?\r\x90@\xb0\x1d\x0c\xbb\xc2'")


CORS(app, origins='http://localhost:3000')  


migrate = Migrate(app, db)
api = Api(app)


@app.route('/')
@app.route('/<path:path>')
def index(path=None):
    return render_template('index.html')


class Index(Resource):
    def get(self):
        return {"message": "Welcome to the Wonderful Wines RESTful API"}, 200

api.add_resource(Index, '/')


class Wines(Resource):
    def get(self):
        wine_dict_list = [wine.to_dict() for wine in Wine.query.all()]
        if wine_dict_list:
            return wine_dict_list, 200
        else:
            return {"message": "No Wines Found"}, 404

    def post(self):
        data = request.get_json()
        user_id = session.get('user_id')
        if not user_id:
            return make_response({"message": "Unauthorized, Please Login to Continue"}, 401)

        new_wine = Wine(
            name=data.get('name', ''),
            type=data.get('type', ''),
            location=data.get('location', ''),
            price=data.get('price', 0),
            flavor_profile=data.get('flavorProfile', ''),
            image=data.get('image')
        )
        db.session.add(new_wine)
        db.session.commit()

        new_review = Review(
            wine_id=new_wine.id,
            user_id=user_id,
            star_review=data.get('rating', ''),
            comment=data.get('comment', '')
        )
        db.session.add(new_review)
        db.session.commit()

        return make_response({"wine": new_wine.to_dict(), "review": new_review.to_dict()}, 201)

api.add_resource(Wines, '/wines')



class WinesById(Resource):
    def get(self, id):
        wine = Wine.query.filter(Wine.id == id).first()
        if wine:
            return make_response(wine.to_dict(), 200)
        return make_response({"message": "Wine not found"}, 404)

    def delete(self, id):
        wine = Wine.query.filter(Wine.id == id).first()
        if not wine:
            return make_response({"error": "Wine not found"}, 404)
        db.session.delete(wine)
        db.session.commit()
        return make_response({"message": "Wine successfully deleted"}, 200)

    def patch(self, id):
        data = request.get_json()
        wine = Wine.query.filter(Wine.id == id).first()
        if not wine:
            return make_response({"error": "Wine not found"}, 404)
        for attr in data:
            if hasattr(wine, attr):
                setattr(wine, attr, data[attr])
        db.session.commit()
        return make_response(wine.to_dict(), 200)

api.add_resource(WinesById, '/wines/<int:id>')



class Reviews(Resource):
    def post(self, id):
        data = request.get_json()
        wine = Wine.query.filter(Wine.id == id).first()

        if not wine:
            return make_response({"message": "Wine not found"}, 404)

        user_id = session.get('user_id')
        if not user_id:
            return make_response({"message": "Unauthorized, Please Login to Continue"}, 401)

        new_review = Review(
            user_id=user_id,
            wine_id=wine.id,
            comment=data.get('comment', ''),
            star_review=data.get('star_review', '')
        )

        db.session.add(new_review)
        db.session.commit()

        return make_response(new_review.to_dict(), 201)

    def get(self, id):
        review = Review.query.filter(Review.id == id).first()
        if review:
            return make_response(review.to_dict(), 200)
        return make_response({"message": "Review not found"}, 404)

    def delete(self, id):
        review = Review.query.filter(Review.id == id).first()
        if not review:
            return make_response({"message": "Review not found"}, 404)
        db.session.delete(review)
        db.session.commit()
        return make_response({"message": "Review successfully deleted"}, 200)

    def patch(self, id):
        data = request.get_json()
        review = Review.query.filter(Review.id == id).first()
        if not review:
            return make_response({"message": "Review not found"}, 404)

        for attr, value in data.items():
            setattr(review, attr, value)

        db.session.commit()
        return make_response(review.to_dict(), 200)

api.add_resource(Reviews, '/reviews/<int:id>')



class Signup(Resource):
    def post(self):
        data = request.get_json()
        if not data:
            return make_response({"message": "Invalid data. No data provided."}, 400)
        
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return make_response({"message": "Username and password are required."}, 422)
        
        user = User.query.filter(User.username == username).first()
        if user:
            return make_response({"message": "Username already taken."}, 422)

        new_user = User(username=username)
        new_user.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

        db.session.add(new_user)
        db.session.commit()

        return make_response(new_user.to_dict(), 201)

api.add_resource(Signup, "/signup")



class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        user = User.query.filter(User.username == username).first()
        
        if user and bcrypt.check_password_hash(user.password_hash, password):
            session['user_id'] = user.id
            return make_response({'message': 'Login successful', 'user': user.to_dict()}, 200)
        
        return make_response({'error': 'Invalid username or password'}, 401)

api.add_resource(Login, '/login')



class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return make_response({'message': 'Logged out successfully'}, 200)

api.add_resource(Logout, '/logout')



class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return make_response(user.to_dict(), 200)
        return make_response({"message": "No user currently logged in"}, 401)

api.add_resource(CheckSession, '/check_session')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
