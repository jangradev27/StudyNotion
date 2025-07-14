import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const RequirementField = ({label,name,errors,setValue,getValues,register}) => {
  const{course,editCourse}=useSelector(state=>state.Course);
  const [RequirementList,setRequirementList]=useState([]);
  const [Requirement,setRequirement]=useState("");

  
  const AddInstruction=(e)=>{
    e.preventDefault();
    const data=Requirement.trim( )
    
    if(data){
        console.log(data)
      setRequirementList((prev)=>[...prev,data]);
      setRequirement("");
    }
  //  console.log(getValues(name))
  }

  const RemoveRequirement=(e,index)=>{
   
    const updatedRequirement=[...RequirementList];
    updatedRequirement.splice(index,1);
    setRequirementList(updatedRequirement);
  }


  useEffect(()=>{
    if(editCourse){
      setRequirement(course?.instructions);
    }
    register(name,{required:true});
  },[])

  useEffect(()=>{
    setValue(name,RequirementList)
  },[RequirementList])

  return (
    <div className='flex flex-col gap-2'>
        
        <label className='text-rich-black-200 font-[400] text-lg'  htmlFor={name}>{label} <sup className='text-red-500'>*</sup></label>
        <input id={name} onChange={(e)=>setRequirement(e.target.value)}
          value={Requirement} type='text' placeholder='Enter the Instructions'
          className=' outline-none w-full bg-rich-black-700 rounded-lg text-rich-black-100 p-2 h-[3rem] shadow-rich-black-50 shadow-[0_1px_0_0]'/>
          {
            errors[name] && <p className='text-red-400 text-sm'>Instructions are required</p> 
          }
        <button type='button'  onClick={AddInstruction} className='text-yellow-50 font-bold font-mono w-fit'>Add</button>
        {
          RequirementList.length>0 && RequirementList.map((ele,index)=><span key={index} className= ' flex gap-2  items-center text-white text-md' >{ele}<button type='button' className='text-rich-black-200 text-sm' onClick={()=>RemoveRequirement(index)}>clear</button></span>)
        }
    </div>
  )
}

export default RequirementField