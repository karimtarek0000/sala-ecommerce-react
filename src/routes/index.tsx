// Site
import Auth from "@layouts/Auth";
import Dashboard from "@layouts/Dashboard";
import Default from "@layouts/Default";
import Login from "@pages/Auth/Login";
import Home from "@pages/index";
import ProductDetails from "@pages/ProductDetails";
import Products from "@pages/Products";

// Dashboard
import ProductsDashboard from "@pages/dashboard/Products";

// Status
import Error from "@pages/Error";
import NotFound from "@pages/NotFound";

// React router dom
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Default />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product-details/:id",
        element: <ProductDetails />,
        loader: ({ params }) => {
          if (typeof params.id === "string" && !/^\d+$/.test(params.id)) {
            throw new Response("Bad Request", {
              statusText: "Product id must be a number",
              status: 400,
            });
          }
          return true;
        },
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <ProductsDashboard />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
