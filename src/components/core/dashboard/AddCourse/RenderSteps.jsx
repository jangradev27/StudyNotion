import { CircleCheck } from 'lucide-react';
import React from 'react'
import { useSelector } from 'react-redux'
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import CourseBuilder from './CourseBuilder/CourseBuilder';
import PublishCourse from './PublishCourse/PublishCourse';

const RenderSteps = () => {
    const {step}=useSelector((state)=>state.Course);
    
    const steps=[{
        id:1,
        title:"Course Information"
    },
    {
        id:2,
        title:"Course Builder"
    },
    {
        id:3,title:"Publish"
    }

    ]
  return (
    <>
        <div className='flex justify-center items-center  w-full '>
            {steps.map((item,index)=><div key={index} className='flex flex-col w-full    '><div className={`flex   justify-center items-center w-full border-[1px] relative  `}>
                <div className={`${item.id==step?" text-center border-yellow-25 bg-yellow-50/10 text-yellow-5":" bg-rich-black-200/10 border-rich-black-300 text-rich-black-300 "} flex w-[3rem] h-[3rem]  border-[1px] justify-center items-center rounded-[50%] `}>
                    <div className={`${item.id<step?"text-yellow-100":""}`}>{item.id < step? <CircleCheck/> :item.id}</div>
                    
                </div>
                
                  { item.id!==3 && <div className={`border-t-[3px]  -right-[35%] absolute ${ item.id<step?" border-yellow-50":"border-rich-black-500" }  border-dashed w-[60%] md:w-[70%] h-1`}></div>
                    }
                
                
            </div>
            <p className={`${item.id==step?" text-yellow-5":" text-rich-black-300 "} text-center text-[13px]  ${item.id<step?"text-yellow-100":""} `}>{ item.id<step? "Done":item.title}</p>
            </div>)}
            
        </div>
        { step===1 && <CourseInformationForm/> }
        { step===2 && <CourseBuilder/>}
        { step===3 && <PublishCourse/>}

    </>
  )
}

export default RenderSteps 