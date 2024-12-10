#!/usr/bin/env python3

#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app, db
from models import db, Wine, Review, User

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        #Wine.query.delete()
        #Review.query.delete()
        #User.query.delete()

        wines = []
        wines.append(Wine(name = 'Educated Guess', 
                          type='Cabernet Sauvignon', 
                          flavor_profile='Dark and Robust', 
                          location = 'Divino', 
                          price=20))

        reviews = []
        reviews.append(Review(star_review= 3, comment="I liked that it was dark and robust, but didnt think it was worth $20", wine_id = 1, customer_id = 1))

        users = []
        users.append(User(username = "Meredith2692"))

        db.session.add_all(wines)
        db.session.add_all(reviews)
        db.session.add_all(users)


        db.session.commit()

        
