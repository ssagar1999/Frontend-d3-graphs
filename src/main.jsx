import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Overview from "./Components/Overview/Overview.jsx";
import SIEM from "./Components/SIEM/SIEM.jsx";
import Home from "./Components/Home/Home.jsx";

Overview

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route exact path="/" element={<App />}>
    {/* <Route path='' element={<Home/>} /> */}
    <Route path='/overview' element={<Overview/>} />
    <Route path='/SIEM' element={<SIEM/>} />

  </Route>
)
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);
