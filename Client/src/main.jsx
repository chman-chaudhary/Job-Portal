import React from 'react'
import ReactDOM from 'react-dom/client'
import { CookiesProvider } from 'react-cookie';
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Views/Home.jsx'
import Jobs from "./Views/Jobs.jsx"
import Job from './Views/Job.jsx'
import Profile from './Views/Profile.jsx'
import UpdateUser from "./Views/UpdateUser.jsx"
import Login from './Views/Login.jsx'
import Signup from "./Views/Signup.jsx"
import UserInfo from './Views/UserInfo.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/job/:id",
    element: <Job />
  },
  {
    path: "/profile/:username",
    element: <Profile />
  },
  {
    path: "/info",
    element: <UserInfo />
  },
  {
    path: "/update/:username",
    element: <UpdateUser />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/new",
    element: <UserInfo />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CookiesProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </CookiesProvider>
  </React.StrictMode>
)
