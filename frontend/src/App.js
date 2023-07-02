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
import axios from "axios";
import { useEffect, useState } from "react";
import DatatablePage from "./Pages/ClinicPage/ClinicPage";
import TableList from "./Pages/ClinicPage/ClinicPage";
import { toast } from "react-hot-toast";



function App() {
  const url = 'https://dev-mindmate.onrender.com/api/v1/users'
  const token = localStorage.getItem('accessToken');
  const userObj = localStorage.getItem('user');
  const user = JSON.parse(userObj);
  const [reload, setReload] = useState(false);

  const handleGetUSerDetails = () => {
    axios.get(url + '/getUserDetails', {
      headers: {
        Authorization: "Bearer " + token
      }
    }).then((res) => {
      console.log(res)
      localStorage.setItem('user', JSON.stringify(res?.data?.data))
    }).catch((err) => {
      console.log(err)
      if (err?.response?.data?.statusCode === 401) {
        localStorage.clear();
        toast.error('Session Expired!')
      }
    })
  }

  useEffect(() => {
    if (token) {
      handleGetUSerDetails();
    }
  }, [])

  const getcall = () => {
    setReload(true);
  }

  return <RouterProvider router={createBrowserRouter([
    {
      path: "/",
      element: (
        <Home token={token} getcall={getcall} />
      ),
    },
    {
      path: "feature",
      element: <Feature token={token} user={user} />,
    },
    {
      path: "analysis",
      element: <Analysis token={token} user={user} />
    },
    {
      path: "book",
      element: <TableList token={token} user={user} />
    },
  ])} />;
}

export default App;
