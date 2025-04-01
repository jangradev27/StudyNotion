import React from 'react'
import AboutHighlightText from '../components/core/AboutUs/AboutHighlightText'
import aboutus1 from "../assets/Images/AboutUs1.webp"
import aboutus2 from "../assets/Images/AboutUs2.webp"
import aboutus3 from "../assets/Images/AboutUs3.webp"
import FoundingStory from "../assets/Images/FoundingStory.png"
import Paragraph from '../components/core/AboutUs/Paragraph'
import { Link } from 'react-router-dom'
import LearningGrid from '../components/core/AboutUs/LearningGrid'
import ContactForm from '../components/common/ContactForm'
import Footer from "../components/common/footer";
const Datatext =[{
    count:"5K",
    text:"Active Students",

},{
  count:"10+",
  text:"Mentors"
},{
  count:"200+",
  text:"Courses"
},{
  count:"50+",
  text:"Awards"
}]

const AboutUs = () => {
  return (
    <div className='min-h-screen font-inter flex flex-col gap-10   items-center bg-rich-black-900'>

            {/* section 1 */}
            <section className='  bg-rich-black-800 w-full h-[38rem] sm:h-[30rem] flex flex-col relative  gap-8 items-center lg:h-[550px]'>
                <div className='flex flex-col gap-3 items-center mt-8'>
                <h1 className=' text-rich-black-400 underline'>About Us</h1>

                <div className='lg:w-[913px] flex flex-col gap-8 '>
                    <h1 className=' text-white text-4xl px-2  sm:px-0 sm:text-center'>Driving Innovation in Online Education for a <AboutHighlightText child={"Brighter Future"} gradient={"bg-gradient-1"} /></h1>
                    <p className='text-rich-black-300 px-2  sm:px-0 sm:text-center text-lg'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                </div>
                </div>
                <div className='absolute z-[2]  grid grid-cols-3  gap-4  border-[1px] bottom-[1rem] translate-y-8 lg:translate-y-20'>
                      <img src={aboutus1} />
                      <img src={aboutus2} />
                      <img src={aboutus3} />
                 </div>

            </section>
            {/* section 2 */}
            <section className=' lg:h-[25rem] border-b-rich-black-400 border-b-1 py-2 mb-1.5 mt-[7rem] lg:mt-0 flex justify-center items-center   border-white  '>
                    <div className='text-rich-black-200 flex  items-center text-3xl font-[600] w-11/12  '>
                        <p className=' px-2  sm:px-0 sm:text-center'>"We are passionate about revolutionizing the way we learn. Our innovative plat form <AboutHighlightText child={"combines technology,"} gradient={"bg-gradient-1"}/> <AboutHighlightText child={"expertise,"} gradient={"bg-gradient-2"}/> and community to create an <AboutHighlightText child={" unparalleled educational experience."} gradient={"bg-gradient-3"}/>"</p>
                    </div>
            </section>


          {/* Section 3 */}
          <section className=' w-full flex flex-col justify-center items-center gap-10 '>
              <div className=' w-11/12  flex flex-col lg:flex-row justify-between gap-10 '>
                <div className=' w-full lg:w-[50%] flex justify-center items-center '>
                    <Paragraph child={"Our Founding Story "} gradient={"bg-gradient-4"}
                      para={"Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world."}
                      para2={"As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential."}/>
                      

                     
                </div>
                <div className=' w-screen lg:w-[50%] h-[342px] -ml-3 sm:-ml-0 flex justify-center items-center relative '>
                      <div className=' hidden lg:flex w-[372px] h-[257px] bg-image-gradient rounded-[50%] opacity-20 blur-xl absolute z-[1] top-[4%] -left-[2%] '></div>
                        <img src={FoundingStory} className='  z-[2]  sm:w-[470px]' />
                  </div>
              </div>

              <div className=' w-full flex flex-col lg:flex-row justify-center p-6   '>
                <div className='lg:w-[50%] flex justify-center items-center'>
                  <Paragraph child={"Our Vision"} gradient={"bg-gradient-2"} para={"With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience."}/>
                </div>

                <div className='lg:w-[50%] flex justify-center items-center'>
                  <Paragraph child={"Our Mission"} gradient={"bg-gradient-1"} para={"our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities."}/>
                </div>

              </div>
              <div className=' min-h-[10rem] w-full bg-rich-black-800 grid grid-cols-2 grid-rows-2  md:flex  items-center justify-evenly gap-10 p-4'>
                  {
                    Datatext.map((ele,index)=><div key={index} className='flex justify-center text-center  p-2 items-center flex-col gap-3 '>
                      <h1 className='text-3xl text-white '>{ele.count}</h1>
                      <p className=' text-rich-black-300 '>{ele.text}</p>
                    </div>)
                  }
              </div>

          </section>

          <section className='  w-full  flex flex-col gap-10 justify-center items-center '>
               
                <LearningGrid/>
                <ContactForm heading={"Get in Touch"} description={"We’d love to here for you, Please fill out this form."} />
          </section>

          <Footer/>
    </div>
  )
}

export default AboutUs