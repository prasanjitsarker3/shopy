import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from './components/Home/Home';
import Shop from './components/Shop/Shop';
import Order from './components/Orders/Order';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import cartProductLoader from './components/CustomLoader/cartProductLoader';
import CheackOut from './components/CheackOut/CheackOut';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children:[
      {
        path:"/",
        element: <Shop></Shop>
      },
      {
        path:"order",
        element: <Order></Order>,
        loader: cartProductLoader
      },
      {
        path:"inventory",
        element: <Inventory></Inventory>
      },
      {
        path:"login",
        element: <Login></Login>
      },
      {
        path:"checkout",
        element: <CheackOut/>
      }
    ]
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
)
