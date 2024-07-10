import React from "react";
import Home from "./Components/Home/Home";
import Card from "./Components/Card/Card";
import { Toaster } from "react-hot-toast";
import Login from "./Components/Login/Login";
import Layout from "./Components/Layout/Layout";
import Brands from "./Components/Brands/Brands";
import Register from "./Components/Register/Register";
import Notfound from "./Components/Notfound/Notfound";
import UserContextProvider from "./Context/UserContext";
import CartContextProvider from "./Context/CartContext";
import Categories from "./Components/Categories/Categories";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";

let routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "card",
        element: (
          <ProtectedRoute>
            <Card />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      { path: "productdetails/:id", element: <ProductDetails /> },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

export default function App() {
  // let { setUserToken } = useContext(UserContext); // error

  // useEffect(() => {
  //   setUserToken("asdfa");
  // }, []);

  return (
    <CartContextProvider>
      <UserContextProvider>
        <RouterProvider router={routes}></RouterProvider>
      </UserContextProvider>
      <Toaster />
    </CartContextProvider>
  );
}
