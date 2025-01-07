import Home from "./components/home/Home";
import Add from "./components/add/Add";
import Reviews from "./components/review/Reviews"
import Account from "./components/Login/Account";
import WineDetail from "./components/home/WineDetail";  

const routes = [
  {
    path: "/auth/login",  
    element: <Account />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/wines",
    element: <Add />,
  },
 
  {
    path: "/wines/:wineId",  
    element: <WineDetail />,  
  },
  {
    path: "/wines/:wineId/reviews",
    element: <Reviews />,
  }
  
];

export default routes;
