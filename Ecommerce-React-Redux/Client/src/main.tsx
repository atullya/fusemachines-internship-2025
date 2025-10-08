import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./component/Auth/Login.tsx";
import Register from "./component/Auth/Register.tsx";
import Home from "./component/Welcome/Home.tsx";
import ProtectRoute from "./component/ProtectRoute.tsx";
import AdminHome from "./Pages/Admin/AdminHome.tsx";
import DisplayAllProduct from "./Pages/User/DisplayAllProduct.tsx";
import ProductDetails from "./Pages/User/ProductDetails.tsx";
const allRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login setActiveTab={() => {}} />,
  },
  {
    path: "/signup",
    element: <Register setActiveTab={() => {}} />, // ✅ satisfies prop requirement
  },
  {
    path: "/welcome",
    element: (
      <ProtectRoute>
        <Home />
      </ProtectRoute>
    ),
  },
  {
    path: "/display",
    element: (
      <ProtectRoute>
        <DisplayAllProduct />
      </ProtectRoute>
    ),
  },
  {
    path: "/product/:id",
    element: (
      <ProtectRoute>
        <ProductDetails />
      </ProtectRoute>
    ),
  },
  {
    path: "/admin-home",
    element: <AdminHome />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={allRoutes} />
    </Provider>
  </StrictMode>
);
