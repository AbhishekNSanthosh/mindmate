import Home from "./Pages/Home/Home";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Feature from "./Pages/Feature/Feature";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Home />
    ),
  },
  {
    path: "feature",
    element:<Feature/>,
  },
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
