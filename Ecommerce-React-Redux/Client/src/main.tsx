import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const allRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={allRoutes} />
    </Provider>
  </StrictMode>
);
