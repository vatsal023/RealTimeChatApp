import { useState } from 'react'
import './App.css'
import Register from './pages/Register';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Register1 from './pages/Register1';
import Login from './pages/Login';
import VerifyEmail from './pages/verifyEmail';
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/authContext";
import {ProfileProvider} from "./context/profileContext"
import LandingNav from './components/LandingNav';
import Hero from './components/Hero';
import Features from './components/Features';
import Payments from './components/Payment';
import Footer from './components/Footer';
import CustomerLogos from './components/CustomerLogos';
import Home from './pages/Home';
import ChatMessages from './components/Chat/ChatMessages';
import Nav from './components/Chat/Nav';
import TopBar from './components/Chat/TopBar';
import ChatHome from './pages/ChatHome';
import Profile from './components/Profile';
import ChatHomeMock from './pages/ChatHome1';

function App() {
  
   const router = createBrowserRouter([
    {
      path:"/",
      element:<h1>Helloworld</h1>
    },
    {
      path:"/register",
      element:<Register/>
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/users",
      element:<VerifyEmail/>
    },
    {
      path:"/home",
      element:<Home/>
    },
    {
      path:"/msg",
      element:<ChatMessages/>
    },
    {
      path:"/nav",
      element:<Nav/>
    },
    {
      path:"/top",
      element:<TopBar/>
    },
    // {
    //   path:"/chathome",
    //   element:<ChatHome/>
    // },
    {
      path:"/chathome",
      element:<ChatHomeMock/>
    },
    {
      path:"/profile",
      element:<Profile/>
    }
   ])

  return (
    <>
    <AuthProvider>
      <ProfileProvider>
        <RouterProvider router = {router}/>
        <Toaster/>
      </ProfileProvider>
    </AuthProvider>
    </>
  )
}

export default App
