import React from 'react'
import { useSelector } from 'react-redux'
import RenderCardCourses from './RenderCardCourses'
import RenderCartAmount from './RenderCartAmount'
const Cart = () => {
  const{total,totalItems}=useSelector((state)=>state.Cart)
  console.log(total,totalItems)
  return (
    <div className='text-white p-3 w-full flex flex-col min-h-[calc(100vh-3.5rem)]  '>
       <div className=' flex flex-col justify-around p-2 h-[7rem] '>
         <h1 className='text-white text-3xl'>Your Cart</h1>
          <p className=' text-sm text-rich-black-100'>{totalItems} Courses in Cart</p>
       </div>
       <div className='w-[90%] h-[1px] flex  bg-rich-black-600  rounded-2xl'></div>
        {
          total>0?<div className='flex  gap-5   w-full '>
            <RenderCardCourses/>
            <RenderCartAmount/>
          </div>:<div className='w-full  flex justify-center items-center'>Your Cart is Empty</div>
        }

    </div>
  )
}

export default Cart