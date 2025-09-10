import { useState } from 'react'
import './App.css'
import Register from './pages/register';
// import Register from './pages/Register.jsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Register1 from './pages/Register1';

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
      path:"/register1",
      element:<><Register1/></>
    }
   ])

  return (
    <>
       <RouterProvider router = {router}/>

    </>
  )
}

export default App
