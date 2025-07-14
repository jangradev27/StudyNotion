
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
import Cart from './components/core/dashboard/cart';
import { AccType } from './utils/constants';
import StudentRoute from './components/core/auth/StudentRoute';
import InstructorCourse from './components/core/dashboard/InstructorCourses/InstructorCourse';
import AddCourse from './components/core/dashboard/AddCourse';
import NotFound from './components/common/NotFound';
import { getUserDetails } from './services/operation/profile';

const{VerifyToken_api} =Auth;
function App() {
  const {profile:user}=useSelector(state=>state.profile)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("token")){
      const token=JSON.parse(localStorage.getItem("token"));
      dispatch(getUserDetails(token,navigate));
    }
  },[])



  return (
    <div className="App min-h-screen flex flex-col  bg-rich-black-900  overflow-hidden font-inter ">
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

                {
                  user?.AccountType ===AccType.Instructor &&(<>
                    <Route path='my-courses' element={<InstructorCourse/>}/>
                    <Route path='add-course' element={<AddCourse/>}/>
                  </>)
                }
             


             
          </Route>


          <Route path='*' element={<NotFound/>}/>
      
     </Routes>

     
    
    </div>
  );
}

export default App;
