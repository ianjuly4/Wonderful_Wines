#/server/config.py
import os
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.ext.associationproxy import association_proxy

from dotenv import load_dotenv
load_dotenv()

# Initialize the Flask app
app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build', 
    template_folder='../client/build'
)

# Set app configurations
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI', 'sqlite:///instance/app.db')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', b'9\x8c_\xc8\x16$OE\xbe5\x98d\x19\xc1\xd8(')
app.config['SESSION_COOKIE_NAME'] = 'session' 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SESSION_COOKIE_SECURE'] = True  
app.config['SESSION_COOKIE_HTTPONLY'] = True  
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'  
app.json.compact = False

# Initialize SQLAlchemy
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

# Initialize Migrate, Bcrypt, and other extensions
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
CORS(app, origins=['http://localhost:3000', 'https://wonderful-wines-1.onrender.com'], supports_credentials=True)
api = Api(app)

# Initialize app with the db instance
db.init_app(app)

# Make the app, db, and other extensions accessible for import
__all__ = ["app", "db", "bcrypt", "migrate", "api", "os"]