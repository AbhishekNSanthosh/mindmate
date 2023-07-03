import axios from "axios";
import AdminLogin from "./Pages/AdminLogin/AdminLogin";
import Dashboard from "./Pages/Dashboard/Dashboard";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { useEffect } from "react";


function App() {
  const url = 'https://dev-mindmate.onrender.com/api/v1/users'
  const token = localStorage.getItem('adminAccessToken')

  const handleUserdetails = () => {
    axios.get(url + '/validateAdmin', {
      headers: {
        Authorization: "Bearer " + token
      }
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    if (token) {
      handleUserdetails();
    }
  }, [])
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
