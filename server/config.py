import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api
from flask_cors import CORS

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build', 
    template_folder='../client/build', 
)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI', 'sqlite:///instance/app.db')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your_secret_key') 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)
api = Api(app)
CORS(app)
