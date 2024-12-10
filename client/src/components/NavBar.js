import { useState } from "react";
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";

function NavBar({}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  
  const [loggedInUsername, setLoggedInUsername] = useState(''); 

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("Must enter a username or email.").max(25),
      password: yup
        .string()
        .required("Must enter a password")
        .max(25)
    }),
    onSubmit: (values) => {
  
      fetch("login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((r) => r.json())
        .then((response) => {
          if (response.message) {
            setIsLoggedIn(true);  
            setLoggedInUsername(values.username);  

          }
        })
        .catch((error) => {
          console.error("Error:", error);
          formik.resetForm();
        });
    },
  });

  return (
    <div className="w-full bg-gradient-to-r from-red-400 to-white flex justify-center items-center h-16">
      <nav className="flex space-x-4">
        
        {/* Login Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-5xl text-white font-semibold hover:text-black transition-all"
          >
            {isLoggedIn ? `Welcome Back, ${loggedInUsername}!` : 'Login'}
          </button>
          
          {isDropdownOpen && !isLoggedIn && (
            <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md w-72 p-4">
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                
                {/* Username Input */}
                <div>
                  <label htmlFor="username" className="block text-lg font-semibold">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-md"
                    required
                  />
                  {formik.touched.username && formik.errors.username && (
                    <div className="text-red-500 mt-1 text-sm">{formik.errors.username}</div>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="password" className="block text-lg font-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-md"
                    required
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-red-500 mt-1 text-sm">{formik.errors.password}</div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-700 transition-all"
                >
                  Login
                </button>
              </form>
            </div>
          )}

          {/* Show a "Logged In" message if user is logged in */}
          {isLoggedIn && (
            <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md w-72 p-4">
              <p className="text-lg font-semibold">Welcome Back, {loggedInUsername}!</p>
              <button
                onClick={() => {
    
                  setIsLoggedIn(false);
                  setLoggedInUsername('');
                  formik.resetForm();
                  setIsDropdownOpen(false); 
                }}
                className="mt-2 w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Account Link */}
        <NavLink
          to="/Account"
          className={({ isActive }) =>
            isActive
              ? "nav-link text-5xl text-black font-semibold hover:text-black"
              : "nav-link text-5xl text-white font-semibold hover:text-black transition-all"
          }
        >
          Account
        </NavLink>

        {/* Other Nav Links */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "nav-link text-5xl text-black font-semibold hover:text-black"
              : "nav-link text-5xl text-white font-semibold hover:text-black transition-all"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/Add"
          className={({ isActive }) =>
            isActive
              ? "nav-link text-5xl text-black font-semibold hover:text-black"
              : "nav-link text-5xl text-white font-semibold hover:text-black transition-all"
          }
        >
          Add
        </NavLink>

        <NavLink
          to="/Delete"
          className={({ isActive }) =>
            isActive
              ? "nav-link text-5xl text-black font-semibold hover:text-black"
              : "nav-link text-5xl text-white font-semibold hover:text-black transition-all"
          }
        >
          Delete
        </NavLink>

        <NavLink
          to="/Update"
          className={({ isActive }) =>
            isActive
              ? "nav-link text-5xl text-black font-semibold hover:text-black"
              : "nav-link text-5xl text-white font-semibold hover:text-black transition-all"
          }
        >
          Update
        </NavLink>

        <NavLink
          to="/Review"
          className={({ isActive }) =>
            isActive
              ? "nav-link text-5xl text-black font-semibold hover:text-black"
              : "nav-link text-5xl text-white font-semibold hover:text-black transition-all"
          }
        >
          Reviews
        </NavLink>
        
      </nav>
    </div>
  );
}

export default NavBar;
