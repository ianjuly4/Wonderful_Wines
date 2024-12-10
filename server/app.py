from flask import request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from config import app, db, Api, CORS, Migrate
from models import Wine, Review, User


CORS(app, origins='http://localhost:4000')
migrate = Migrate(app, db)
api = Api(app)


@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

