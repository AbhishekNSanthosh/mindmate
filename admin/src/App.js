import AdminLogin from "./Pages/AdminLogin/AdminLogin";
import Dashboard from "./Pages/Dashboard/Dashboard";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";


function App() {
  return <RouterProvider router={createBrowserRouter([
    {
      path: "/",
      element: (
        <Dashboard />
      ),
    },
    {
      path: "/Admin-login",
      element: (
        <AdminLogin />
      ),
    },
  ])} />;
}

export default App;
