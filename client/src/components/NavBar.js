import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { MyContext } from './MyContext';

function NavBar() {
  const { user, login, logout } = useContext(MyContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("Must enter a username or email.").max(25),
      password: yup.string().required("Must enter a password").max(25)
    }),
    onSubmit: (values) => {
      
      login(values); 
    }
  });

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-full bg-gradient-to-r from-red-400 to-white flex justify-center items-center h-16">
      <nav className="flex space-x-4">
        {/* Login/Logout Dropdown */}
        <div className="relative dropdown">
          <button
            onClick={toggleDropdown}
            className="text-5xl text-white font-semibold hover:text-black transition-all"
          >
            {user ? 'Logout' : 'Login'}
          </button>

          {/* Login Form Dropdown */}
          {!user && isDropdownOpen && (
            <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md w-72 p-4 z-50">
              <form onSubmit={formik.handleSubmit} className="space-y-4">
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
          {user && isDropdownOpen && (
            <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md w-72 p-4 z-50">
              <button
                onClick={() => {
                  logout();
                  setIsDropdownOpen(false);
                }}
                className="mt-2 w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Nav Links */}
        <NavLink
          to="/users"
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
          end
        >
          Home
        </NavLink>

        <NavLink
          to="/wines/new"
          className={({ isActive }) =>
            isActive
              ? "nav-link text-5xl text-black font-semibold hover:text-black"
              : "nav-link text-5xl text-white font-semibold hover:text-black transition-all"
          }
        >
          Add Wine
        </NavLink>
      </nav>
    </div>
  );
}

export default NavBar;
