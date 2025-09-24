import { useState,useEffect } from 'react'
import './App.css'
import Register from './pages/Register';
import { createBrowserRouter, RouterProvider, Outlet, ScrollRestoration, } from 'react-router-dom'
import Register1 from './pages/Register1';
import Login from './pages/Login';
import VerifyEmail from './pages/verifyEmail';
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/authContext";
import { ProfileProvider } from "./context/profileContext"
import Home from './pages/Home';
import ChatMessages from './components/Chat/ChatMessages';
import Nav from './components/Chat/Nav';
import TopBar from './components/Chat/TopBar';
import ChatHome from './pages/ChatHome';
import Profile from './components/Profile';
import ChatHomeMock from './pages/ChatHome1';
import axios from "axios";
import { baseUrl } from '../apiconfig';

const Layout = () => {
  const { isAuthenticated, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
    console.log("Layout effect")
  }, [isAuthenticated]);

  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "users/:id/verify/:token",
        element: <VerifyEmail />
      },
      {
        path:"chathome",
        element:<ChatHome/>
      },
      {
        path: "chathome1",
        element: <ChatHomeMock />
      },
      {
        path: "profile",
        element: <Profile />
      }
    ]
  }
])

function App() {


  axios.defaults.baseURL = baseUrl;
  axios.defaults.withCredentials = true;


  return (
    <>
      <AuthProvider>
        <ProfileProvider>
          <RouterProvider router={router} />
          <Toaster />
        </ProfileProvider>
      </AuthProvider>
    </>
  )
}

export default App
