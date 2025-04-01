
import './App.css';
import { Route, Router, Routes } from 'react-router';
import Home from './pages/Home';
import OtpSection from './components/core/auth/OtpSection';
import Navbar from './components/common/Navbar';
import Login from './pages/LoginPage';
import SignUp from './pages/SIgnUpPage';
import ForgotPassword from './pages/ForgotPassword';
import Openroute from './components/core/auth/Openroute';
import UpdatePassword from './pages/UpdatePassword';
import AboutUs from './pages/aboutUs';
import ContactUs from './pages/ContactUs';
import Dashboard from './pages/Dashboard';
function App() {

  
  
  return (
    <div className="App min-h-screen flex flex-col bg-rich-black-900   ">
      <Navbar/>
     <Routes>
        <Route path='/' element={<Home/>} />

        <Route path='/login' element={<Openroute>
          <Login/>
        </Openroute>}/>

        <Route path='/signup' element={<Openroute>
          <SignUp/>
        </Openroute>}/>
        <Route path='/Verify-Otp' element={<Openroute>
          <OtpSection/>
        </Openroute>}/>

        <Route path="/login/Forgot-Password" element={<Openroute>
          <ForgotPassword/>
        </Openroute>}/>

        <Route path='/update-password/:token' element={<Openroute>
          <UpdatePassword/>
        </Openroute>}/>


         <Route path='/about' element={<AboutUs/>}/> 
         <Route path='/dashboard/my-profile' element={<Dashboard/>}/>

         <Route path='/contact' element={<ContactUs/>}/>
     </Routes>

     
    
    </div>
  );
}

export default App;
