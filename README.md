# Wonderful Wines

**Wonderful Wines** is a web application built with **React** and **Flask**. It allows users to search for wines based on their preferences, add new wines, and share reviews. Users can filter wines based on specific attributes and view detailed information, including ratings and reviews.

## Built With

- **JavaScript**
- **JSX**
- **React**
- **Flask**
- **Python**
- **Local DbJson** (for storing wine data)

## Getting Started

These instructions will help you set up and run the project on your local machine for development or testing.

### Prerequisites

To run this project locally, you will need:

- **Google Chrome** or **Safari** (Recommended browsers for the best experience)
- **Node.js** (for running the React frontend)
- **Python 3.x** (for running the Flask backend)

### Installation

1. **Clone the Repository**

   First, clone the repository to your local machine:

   git clone https://github.com/ianjuly4/wonderful-wines.git
   cd wonderful-wines

2. **Backend (Flask) Setup**

  - Set up a virtual environment for Flask (optional but recommended):

      python3 -m venv venv
      source venv/bin/activate  # On Windows, use venv\Scripts\activate

  - Install the necessary dependencies for Flask:

      pip install -r backend/requirements.txt

  - Run the Flask backend:
    
      python backend/app.py
      The Flask backend should now be running on http://localhost:5555.

3. **Frontend (React) Setup**

  - Navigate to the frontend directory:

      cd frontend

  - Install the required dependencies for React:

      npm install

  - Start the React development server:

      npm start
      The React frontend will now be running on http://localhost:3000.

#### App Structure
  - Home
      Navbar: A navigation bar that links to different parts of the app.
      Header: Displays a header section for the website.
      Filter: Allows users to filter wines based on attributes like price, type, and rating.
      WineList: Displays a list of wines based on applied filters.
      WineDetail: Displays detailed information about each wine, including:
      Reviews: Displays user reviews and ratings for the wine.

  - Add Wine
      Navbar: A navigation bar that links to different parts of the app.
      Header: Displays a header section for the page.
      Form: Allows users to add a new wine, including details like name, price, type, and a review.

  - Account
      Navbar: A navigation bar that links to different parts of the app.
      Header: Displays a header section for the page.
      Signup/Login: Allows users to create an account or log in.
      UserAccount: Users can manage their account settings.
      UserWines: A list of wines added by the user.
      Reviews: Displays all reviews made by the user.

#### Usage
  After following the installation steps, you can access the application:

  Frontend (React): Open your browser and go to http://localhost:3000 to start browsing the wines, searching, or adding your own reviews.
  Backend (Flask): The backend API should be running at http://localhost:5000.
  The Wonderful Wines web application allows users to:

  Search for Wines: Find wines based on name, type, rating, etc.
  Add Wines: Users can add new wines with details such as name, price, flavor profile, and reviews.
  View Wine Details: Click on a wine to see more information, including user reviews, ratings, and a description of the wine.
  Leave Reviews: Users can leave reviews and ratings for wines they've tried.

#### Contributing
We welcome contributions! Here’s how you can contribute to this project:

1. Fork the Repository: Click the "Fork" button at the top-right of the repository to create your own copy of the repository.

2. Clone Your Fork: Clone the forked repository to your local machine:
  git clone https://github.com/your-username/wonderful-wines.git
  cd wonderful-wines

3. Create a New Branch: For example:
  git checkout -b my-feature-branch

4. Make Your Changes: Implement your feature or fix bugs.

5. Commit Your Changes:
  git add .
  git commit -m "Description of the changes"

6. Push Changes: Push the changes to your fork:
  git push origin my-feature-branch

7. Open a Pull Request: Open a pull request to the original repository.

If you have suggestions for improvements, feel free to open an issue with the tag "enhancement".

#### License
This project is licensed under the MIT License – see the LICENSE file for details.

#### Contacts
  - Author: Ian July
  - Project Link: https://github.com/ianjuly4/wonderful-wines

#### Acknowledgments
React and Flask for making full-stack development more accessible.
Various open-source libraries and resources that helped shape this project.
DbJson for the simple database solution.



