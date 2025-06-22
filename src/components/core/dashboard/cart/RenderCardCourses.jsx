import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Rating from 'react-rating';
import ReactStars from 'react-stars';
import { IoStar } from "react-icons/io5";
import { removeFromCart } from '../../../../slices/cartSlice';
import { MdDeleteForever } from "react-icons/md";

const RenderCardCourses = () => {
    const{cart}=useSelector(state=>state.Cart);
    // const cart=[{
    //     _id:12345,
    //     thumbnail:"https://res.cloudinary.com/dgrtpvmnf/image/upload/v1744558087/StudyNotionProfilePic/crr6f0w7raks7frtmgvw.jpg",
    //     courseName:"devjangra",
    //     category:{
    //         name:"name"
    //     },
    //     courseDescripton:"asflasdnfasdnflnasdnfsa",
    //     progressPercentage:60,
    //     totalDuration:"2hr 30 mins",
    //     averageRating:2.8,
    //     RatingReviews:[1,2,3,4,5]
    //  }]
    const dispatch=useDispatch()
    console.log(cart)

  return (
    <div className='w-[60%]'>
        {
            cart.map((Course,index)=><div key={index} className={`  ${index===cart.length-1?"":" border-b-[0.1px] border-rich-black-700"} p-4  flex gap-5 w-full`} >
                <div className='w-[70%] flex gap-4 p-2'>
                    <img src={Course?.thumbnail} className='w-[10rem] h-[8rem] rounded-xl'/>
                    <div>
                        <p className='text-white font-bold  text-xl'>{Course?.courseName}</p>
                        <p className='text-sm text-rich-black-100'>{Course?.category?.name}</p>
                        <div className='flex justify-center items-center  gap-2 '>
                            <div className='text-[12px] flex items-center  font-bold text-yellow-100 '>{Course?.averageRating}</div>
                            <div className='flex items-center'>
                                <ReactStars
                                count={5}
                                size={20}
                                value={Course?.averageRating}
                                edit={false}
                                half={true}
                                activeColor="#ffd700"
                                emptyIcon={<IoStar/>}
                                fullIcon={<IoStar/>}
                                />
                            </div>
                            <div className=' flex items-center text-rich-black-200 text-sm'>Reviews {Course?.RatingReviews?.length}</div>
                           
                        </div>
                       
                    </div> 
                    
                </div>
                <div className=' flex justify-start p-4 items-start flex-col'>
                        <button className=' bg-rich-black-800 rounded-lg p-2 cursor-pointer hover:scale-95 transition-transform ' onClick={()=> dispatch(removeFromCart(Course._id))}><div className='flex items-center justify-center gap-1 text-red-500'>
                           <MdDeleteForever/> Remove</div></button>
                        <div className=' text-yellow-100 font-bold text-2xl p-2'>Rs. {Course?.price}</div>
                    </div> 
            </div>)
        }
    
      

    </div>
  )
}

export default RenderCardCourses