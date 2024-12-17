import Home from "./components/home/Home";
import Add from "./components/add/Add";
import ReviewPage from "./components/review/ReviewPage";
import Update from "./components/update/Update";
import Delete from "./components/delete/Delete";
import Account from "./components/Login/Account";
import WineDetail from "./components/home/WineDetail";  

const routes = [
  {
    path: "/users",  
    element: <Account />,
  },
  {
    path: "/wines",
    element: <Home />,
  },
  {
    path: "/wines/new",
    element: <Add />,
  },
  {
    path: "/delete",
    element: <Delete />,
  },
  {
    path: "/update",
    element: <Update />,
  },
  {
    path: "/reviews",
    element: <ReviewPage />,
  },

  {
    path: "/wine/:wineId",  
    element: <WineDetail />,  
  },
];

export default routes;
