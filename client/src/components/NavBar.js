import { useState } from "react";
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";

function NavBar({}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  
  const [loggedInUsername, setLoggedInUsername] = useState(''); 
  const [loginError, setLoginError] = useState(''); 

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
            setLoginError(''); 
            setIsDropdownOpen(false); 
          } else if (response.error) {
            setLoginError(response.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoginError('An error occurred, please try again.');
        });
    },
  });

  const handleLogout = () => {
    fetch('/logout', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then(() => {
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="w-full bg-gradient-to-r from-red-400 to-white flex justify-center items-center h-16">
      <nav className="flex space-x-4">
        
        {/* Login/Logout Dropdown */}
        <div className="relative">
  
          <button
            onClick={toggleDropdown}
            className="text-5xl text-white font-semibold hover:text-black transition-all"
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>

          {/* Login Form Dropdown */}
          {!isLoggedIn && isDropdownOpen && (
            <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md w-72 p-4 z-50">
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                {/* Username Input */}
                <div>
                   {/* Display login error message */}
                  {loginError && <div className="text-red-500 text-sm">{loginError}</div>}
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

          {/* Logout Button */}
          {isLoggedIn && isDropdownOpen && (
            <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md w-72 p-4 z-50">
              <button
                onClick={handleLogout}
                className="mt-2 w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Nav Links */}
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
