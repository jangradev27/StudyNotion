import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';

const ChipInput = ({label,placeholder,register,setValue,getValues,errors,name}) => {
  const[Tags,setTag]=useState([]);
  const {course,editCourse}=useSelector((state)=>state.Course);
  const handlekeydown=(e)=>{
      if(e.key=="Enter" || e.key==","){
        e.preventDefault();

        const value=e.target.value.trim();
        if(value && !Tags.includes(value)){
          setTag((prev)=>[...prev,value])
        }

          e.target.value=""
      }
  }
  const DeleteTag=(itemindex)=>{
    const newTag=Tags.filter((_,index)=>index!=itemindex);
    setTag(newTag);
  }
  useEffect(()=>{
    if(editCourse){
      setTag(course?.tag);
    }
    register(name,{required:true});
  })
  useEffect(()=>{
    setValue(name,Tags);
  },[Tags])

  return (
    <div className='flex flex-col gap-2'>
        <label htmlFor={name} className='text-rich-black-200 font-[400] text-lg'>{label}<sup className='text-red-500'>*</sup></label>
        <div className=' w-full flex gap-3 flex-wrap'>

          {
            Tags?.length>0 && Tags.map((ele,index)=><span key={index} className='text-white text-sm  p-2 rounded-xl w-fit bg-yellow-100/60 h-[2rem] flex  items-center gap-2'>{ele} <button type='button' className='p-1 cursor-pointer' onClick={()=>DeleteTag(index)} ><RxCross2/></button></span>)
          }
        </div>


        <input type='text' className='outline-none bg-rich-black-700 h-[3rem] text-rich-black-100 rounded-lg p-2 shadow-white shadow-[0_1px_0px_0px]'
          onKeyDown={handlekeydown}
          placeholder={placeholder}
          name={name}

        />
        {
          errors[name] && (<p className='text-red-400 text-sm'>Tags are required</p>)
        }
    </div>
  )
}

export default ChipInput