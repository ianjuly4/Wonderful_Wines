import Home from "./components/home/Home";
import Add from "./components/add/Add";
import ReviewPage from "./components/review/ReviewPage";
import Update from "./components/update/Update";
import Delete from "./components/delete/Delete";
import Account from "./components/Login/Account";

const routes = [
  {
    path: "/Account",
    element: <Account />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Add",
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
    path: "/Review",
    element: <ReviewPage />,
  },
];

export default routes;
