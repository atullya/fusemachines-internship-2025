import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Welcome from "./pages/HomePage/Welcome.tsx";
import { Login } from "./pages/AuthPage/Login.tsx";
import { Signup } from "./pages/AuthPage/Signup.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import ProtectedRoute from "./components/ui/ProtectedRoutes.tsx";
import ChangePassword from "./pages/HomePage/ChangePassword.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
const allRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/welcome",
    element: (
      <ProtectedRoute>
        <Welcome />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/changePassword",
    element: <ChangePassword />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <RouterProvider router={allRoutes} />
      </Provider>
    </AuthProvider>
  </StrictMode>
);
