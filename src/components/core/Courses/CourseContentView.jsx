import { ArrowBigDown } from 'lucide-react';
import React, { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdOutlineComputer } from "react-icons/md";

const CourseContentView = ({Course}) => {
    console.log(Course)
    const[visible,setVisible]=useState(false);
    const[innerVisible,setinner]=useState(false);
    const handleChange=()=>{
        setVisible(!visible);
    }
    function convertToMin(data){
      
       return data/60;
    }
    const innerChange=()=>{
        setinner(!innerVisible);
    }
  return (
   <> 
   {
        Course?.CourseContent?.map((ele,index)=>(<details key={index} className=' border-[0.1px] border-gray-900 text-white group w-[70%] '>
            <summary onClick={handleChange} className='list-none cursor-pointer text-xl font-edu-sa bg-gray-800 px-4 py-4 flex items-center gap-1 '><IoIosArrowDown className={`${!visible?"rotate-[180deg]":""} transition-transform duration-500`}/>asfaslfjlaskdf
                
            </summary>
            <div>
                {ele?.Subsection?.map(sub=>(<div className='px-8'>
                    <details className=''>
                        <summary onClick={innerChange} className=' flex justify-between list-none cursor-pointer text-xl font-edu-sa  px-4 py-4  items-center gap-1 '>
                            <p className='flex items-center gap-1 text-lg'> <MdOutlineComputer /> {sub.title} {<IoIosArrowDown  className={`${innerVisible?"rotate-[180deg]":""} transition-transform duration-500 `} />}</p>  <p className=' text-sm'>{convertToMin(sub.TimeDuration)}</p>
                        </summary>
                        <span className=' w-full px-7 text-gray-300 '>{sub.description}</span>
                     </details>
                </div>))}
            </div>
        </details>))
     }
    </>
  )
}

export default CourseContentView