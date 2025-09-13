import { useState } from 'react'
import './App.css'
import Register from './pages/Register';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Register1 from './pages/Register1';
import Login from './pages/Login';
import VerifyEmail from './pages/verifyEmail';
import { AuthProvider, useAuth } from "./context/authContext";
import {ProfileProvider} from "./context/profileContext"
import LandingNav from './components/LandingNav';
import Hero from './components/Hero';
import Features from './components/Features';
import Payments from './components/Payment';
import Footer from './components/Footer';
import CustomerLogos from './components/CustomerLogos';
import Home from './pages/Home';

function App() {
  
   const router = createBrowserRouter([
    {
      path:"/",
      element:<><h1>Helloworld</h1></>
    },
    {
      path:"/register",
      element:<><Register/></>
    },
    {
      path:"/login",
      element:<><Login/></>
    },
    {
      path:"/users",
      element:<><VerifyEmail/></>
    },
    {
      path:"/landing",
      element:<><LandingNav/></>
    },
    {
      path:"/hero",
      element:<><Hero/></>
    },
    {
      path:"/features",
      element:<><Features/></>
    },
    {
      path:"/payment",
      element:<><Payments/></>
    },
    {
      path:"/footer",
      element:<><Footer/></>
    },
    {
      path:"/logos",
      element:<CustomerLogos/>
    },
    {
      path:"/home",
      element:<Home/>
    }
   ])

  return (
    <>
    <AuthProvider>
      <ProfileProvider>
        <RouterProvider router = {router}/>
      </ProfileProvider>
    </AuthProvider>
    </>
  )
}

export default App
