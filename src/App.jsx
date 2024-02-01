import { useState } from 'react'
import './App.css'
import { MainPage } from './pages/MainPage'
import {Routes,Route} from 'react-router-dom'
import {Signup} from './components/Signup'
import { Login } from './components/Login'
import { CreateApplication } from './components/CreateApplication'
import { Applications } from './pages/Applications'
import { EditApplication } from './components/EditApplication'
function App() {
  

  return (
    <>
    <Routes>
   
   <Route path='/' element={ <MainPage/>} />
   <Route path='signup' element={ <Signup/>} />
   <Route path='login' element={ <Login/>} />
   <Route path='createapplication' element={ <CreateApplication/>} />
   <Route path='applications' element={ <Applications/>} />
   <Route path='applicationedit/:id' element={ <EditApplication/>} />
   
   </Routes>
    
    </>
  )
}

export default App
