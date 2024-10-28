import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import dotenv from "dotenv";
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "./pages/AuthContext.jsx"; 

ReactDOM.createRoot(document.getElementById('root')).render(
 
  <BrowserRouter>
   <AuthProvider><App /></AuthProvider>

  </BrowserRouter>
 
)
