
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
db = SQLAlchemy()
from flask_restful import Resource

from config import db


class Wine(db.Model, SerializerMixin):
    __tablename__ = 'wines'

    serialize_rules = ('-reviews.wine',)
    

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    type = db.Column(db.String)
    flavor_profile = db.Column(db.String)
    location = db.Column(db.String)
    price = db.Column(db.Float)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    image = db.Column(db.String)

    reviews = db.relationship('Review', back_populates='wine', cascade='all, delete-orphan')
    users = association_proxy('reviews', 'user', creator=lambda user_obj: Review(user=user_obj))
    
class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    serialize_rules = ('-wine.reviews', '-user.reviews',)

    id = db.Column(db.Integer, primary_key=True)
    star_review = db.Column(db.Integer)
    comment = db.Column(db.String)

    wine_id = db.Column(db.Integer, db.ForeignKey('wines.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    wine = db.relationship('Wine', back_populates='reviews')
    user = db.relationship('User', back_populates='reviews')

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-reviews.user',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String)
    
    reviews = db.relationship('Review', back_populates='user', cascade='all, delete-orphan')
    
    wines = association_proxy('reviews', 'wine', creator=lambda wine_obj: Review(wine=wine_obj))
