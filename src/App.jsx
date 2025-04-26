import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Root from "./components/Routes/Root";
import Shop from "./pages/Shop";
import ShopBooks from "./pages/ShopBooks";
import Author from "./pages/Author";
import Books from "./pages/Books";
import Stores from "./pages/Stores";

function App() {
  let routers = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Navigate to="/shop" replace />,
        },
        {
          path: "shop",
          children: [
            {
              index: true,
              element: <Shop />,
            },
            {
              path: "books",
              element: <ShopBooks />,
            },
          ],
        },
        {
          path: "author",
          element: <Author />,
        },
        {
          path: "books",
          element: <Books />,
        },
        {
          path: "stores",
          element: <Stores />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routers} />;
}

export default App;
