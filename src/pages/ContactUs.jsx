import React from 'react'
import { IoIosChatboxes } from "react-icons/io";
import { FaEarthAsia } from "react-icons/fa6";
import { IoIosCall } from "react-icons/io";
import ContactForm from '../components/common/ContactForm'
import Footer from '../components/common/footer';

const ContactUs = () => {
  return (
   <div className='flex flex-col'>
      <div className=' flex justify-around items-center lg:items-start py-4 lg:flex-row flex-col gap-5 '>
        <div className=' sm:w-[20rem] lg:w-[30%]  grid grid-rows-3 h-[20rem] bg-rich-black-800 rounded-lg p-2 ' >
            <div className='flex justify-evenly items-start gap-3 text-white text-2xl '>
                <IoIosChatboxes/>
                <div className=' lg:w-[80%] flex flex-col gap-2 justify-start text-lg'>
                    <h1>Chat on us</h1>
                    <p className='text-sm text-rich-black-300'>Our friendly team is here to help.</p>
                    <p className='text-sm text-rich-black-300'>@mail address</p>
                </div>
            </div>

            <div className='flex justify-evenly items-start gap-3 text-white text-2xl '>
                <FaEarthAsia/>
                <div className=' lg:w-[80%] flex flex-col gap-2 justify-start text-lg'>
                    <h1>Chat on us</h1>
                    <p className='text-sm text-rich-black-300'>Our friendly team is here to help.</p>
                    <p className='text-sm text-rich-black-300'>@mail address</p>
                </div>
            </div>

            <div className='flex justify-evenly items-start gap-3  text-white text-2xl '>
                <IoIosCall/>
                <div className=' lg:w-[80%] flex flex-col gap-2 justify-start text-lg'>
                    <h1>Chat on us</h1>
                    <p className='text-sm text-rich-black-300'>Our friendly team is here to help.</p>
                    <p className='text-sm text-rich-black-300'>@mail address</p>
                </div>
            </div>
        </div>
            <div className='lg:w-[40%]' >
                <ContactForm heading={"Got a Idea? We’ve got the skills. Let’s team up"}
                    description={"Tall us more about yourself and what you’re got in mind."}/>
            </div>
    </div>
    <Footer/>
   </div>
  )
}

export default ContactUs