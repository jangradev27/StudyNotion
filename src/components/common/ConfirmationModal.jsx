import React from 'react'
import { NavLink } from 'react-router-dom'
import IconBtn from './IconBtn'

const ConfirmationModal = ({modalData}) => {
  return (
    <div className='fixed z-[4]  text-white inset-0 backdrop-blur-sm   flex justify-center items-center'>
        <div className=' bg-rich-black-800 rounded-md w-[24rem] h-[10rem] flex flex-col justify-around items-center'>
            <div className='flex justify-around items-start flex-col h-[50%] w-[20rem] text-2xl'>
              <p className='font-bold'>{modalData.text1}</p>
              <p className='text-rich-black-300 text-lg'>{modalData.text2}</p>
            </div>
            <div className='flex justify-around w-[20rem]'>
                <IconBtn customClasses={`bg-yellow-200 w-[5rem] p-2 rounded-md text-black font-[500] transition-all hover:bg-yellow-300 cursor-pointer hover:scale-95`} onclick={modalData?.btn1handler} text={modalData?.btn1text}/>
                <button className='bg-rich-black-200 w-[5rem] p-2 rounded-md text-black font-[500] transition-all hover:bg-rich-black-300 cursor-pointer hover:scale-95' onClick={modalData?.btn2handler}>
                    {modalData?.btn2text}
                </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal