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
import { useEffect } from "react";



function App() {
  const url = 'https://dev-mindmate.onrender.com/api/v1/users'
  const token = localStorage.getItem('accessToken')
  const handleGetUSerDetails = () => {
    axios.get(url + '/getUserDetails', {
      headers: {
        Authorization: "Bearer " + token
      }
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    handleGetUSerDetails();
  }, [])

  return <RouterProvider router={createBrowserRouter([
    {
      path: "/",
      element: (
        <Home token={token} />
      ),
    },
    {
      path: "feature",
      element: <Feature token={token} />,
    },
    {
      path: "analysis",
      element: <Analysis token={token} />
    },
  ])} />;
}

export default App;
