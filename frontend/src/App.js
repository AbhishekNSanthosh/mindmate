import Home from "./Pages/Home/Home";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Feature from "./Pages/Feature/Feature";
import Analysis from "./Pages/Analysis/Analysis";

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
  {
    path: "analysis",
    element:<Analysis/>,
  },
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
