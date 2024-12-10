import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="w-full bg-gradient-to-r from-red-400 to-white flex justify-center items-center h-16">
      <nav className="flex space-x-4">

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