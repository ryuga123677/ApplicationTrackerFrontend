import { useState } from 'react'
import './App.css'
import { SeekerMainPage } from './pages/SeekerMainpage'
import {Routes,Route} from 'react-router-dom'
import {SignupSeeker} from './components/SignupSeeker'
import { LoginSeeker } from './components/LoginSeeker'
import { CreateApplication } from './components/CreateApplication'
import { Applications } from './pages/Applications'
import { EditApplication } from './components/EditApplication'
import { FullView } from './pages/FullView'
import { Navbar } from './components/Navbar'
import { SignupProvider } from './components/SignupProvider'
import { ApplyJob } from './pages/ApplyJob'
import { OptionPage } from './pages/OptionPage'
import { LoginProvider } from './components/LoginProvider'
import { ProviderMainPage } from './pages/ProviderMainpage'
import { Applicantslist } from './pages/Applicantslist'
function App() {
  

  return (
    <>
    <Navbar/>
    <Routes>
   
   <Route path='/' element={ <OptionPage/>} />
   <Route path='signupseeker' element={ <SignupSeeker/>} />
   <Route path='signupprovider' element={ <SignupProvider/>} />
   <Route path='loginseeker' element={ <LoginSeeker/>} />
   <Route path='loginprovider' element={ <LoginProvider/>} />
   <Route path='seekermainpage' element={ <SeekerMainPage/>} />
   <Route path='providermainpage' element={ <ProviderMainPage/>} />
   <Route path='applicantlist/:id' element={ <Applicantslist/>} />
   <Route path='createapplication' element={ <CreateApplication/>} />
   <Route path='applications' element={ <Applications/>} />
   <Route path='applicationedit/:id' element={ <EditApplication/>} />
   <Route path='fullview/:user' element={ <FullView/>} />
   <Route path='fullview/:user/applyjob' element={ <ApplyJob/>} />
   </Routes>
    
    </>
  )
}

export default App
