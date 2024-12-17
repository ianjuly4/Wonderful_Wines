import Home from "./components/home/Home";
import Add from "./components/add/Add";
import ReviewPage from "./components/review/ReviewPage";
import Update from "./components/update/Update";
import Delete from "./components/delete/Delete";
import Account from "./components/Login/Account";

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
    path: "/wines",
    element: <Add />,
  },
  {
    path: "/Delete",
    element: <Delete />,
  },
  {
    path: "/Update",
    element: <Update />,
  },
  {
    path: "/reviews",
    element: <ReviewPage />,
  },
];

export default routes;
