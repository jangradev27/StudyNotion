
import './App.css';
import { useEffect, useState } from 'react';
import { Route, Router, Routes, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
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
import Myprofile from './components/core/dashboard/Myprofile';
import Privateroute from './components/core/auth/Privateroute';
import Settings from './components/core/dashboard/Setting/Settings';
import EnrolledCourses from './components/core/dashboard/EnrolledCourses';
import { useDispatch, useSelector } from 'react-redux';
import { apiConnector } from './services/apiconnector';
import { Auth } from './services/api';
import { Logout } from './services/operation/Auth';
import Cart from './components/core/dashboard/cart';
import { AccType } from './utils/constants';
import StudentRoute from './components/core/auth/StudentRoute';

const{VerifyToken_api} =Auth;
function App() {
  const {profile:user}=useSelector(state=>state.profile)
  // const navigate=useNavigate();
  // const dispatch=useDispatch();
  // const {token}=useSelector(state=>state.auth);
  // const verifyToken=async()=>{
  //   try{
  //     const response=await apiConnector("POST",VerifyToken_api,null,{
        
  //       Authorization:`Bearer ${token}`
  //     })
  //     if(!response.data.success){
  //       throw new Error(response.data.message);
  //     }
  //   }
  //   catch(err){
  //     console.log(err);
  //     toast.error(err.response.data.message);
  //     console.log("hello")
  //     dispatch(Logout(navigate));
  //   }
  // }
  // useEffect(()=>{
  //   setTimeout(verifyToken(), 2000);
  // },[]);
  



  return (
    <div className="App min-h-screen flex flex-col  bg-rich-black-900    ">
      <Navbar/>
     <Routes>
        <Route path='/' element={<Openroute>
          <Home/>
        </Openroute>} />

        <Route path='/login' element={<Openroute>
          <Login/>
        </Openroute>}/>

        <Route path='/signup' element={<Openroute>
          <SignUp />
        </Openroute>}/>
        <Route path='/Verify-Otp' element={<Openroute>
          <OtpSection />
        </Openroute>}/>

        <Route path="/login/Forgot-Password" element={<Openroute>
          <ForgotPassword/>
        </Openroute>}/>

        <Route path='/update-password/:token' element={<Openroute>
          <UpdatePassword/>
        </Openroute>}/>


         <Route path='/about' element={<AboutUs/>}/> 

         <Route path='/contact' element={<ContactUs/>}/>
         <Route path='/dashboard/*' element={<Privateroute><Dashboard/></Privateroute>}>
              <Route path='my-profile' element={<Myprofile/>}/>
              <Route path="Settings" element={<Settings/>}/>
            
                        
                {
                  user?.AccountType === AccType.Student && (
                    <>
                    <Route path="cart" element={<Cart />} />
                    <Route path="enrolled-courses" element={<EnrolledCourses />} />
                    </>
                  )
                }
             
          </Route>
      
     </Routes>

     
    
    </div>
  );
}

export default App;
