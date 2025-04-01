import React from 'react'
import AboutHighlightText from './AboutHighlightText';
import CTAbutton from "../Homepage/CTAButton"
const LearningGridArray = [
    {
        order: -1,
        heading: "World-Class Learning for",
        highlightText: "Anyone, Anywhere",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText: "Learn More",
        BtnLink: "/#learning",
    },
    {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order: 2,
        heading: "Our Learning Methods",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 3,
        heading: "Certification",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 4,
        heading: `Rating "Auto-grading"`,
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 5,
        heading: "Ready to Work",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
];



const LearningGrid = () => {
  return (
    <div className='grid place-items-center mx-auto grid-cols-1 lg:grid-cols-4  sm:w-11/12  mb-10'>
        {
            LearningGridArray.map((grid,index)=><div key={index} className={` p-x-4 lg:p-0  lg:h-[15rem] ${index===0 && 'lg:col-span-2'}
            h-[20rem] w-[20rem] lg:w-full
            ${grid.order%2===0?"bg-rich-black-800":"bg-rich-black-600"}
            ${grid.order===3 && "lg:col-start-2"} ${grid.order===-1?"bg-none":""}
            ${grid.order===-1 && "bg-rich-black-900"}
            `}>
                {
                    grid.order!==-1?<div className=' lg:w-[90%]  p-5 font-semibold w-full h-full flex flex-col justify-around text-lg '>
                        <h1 className=' text-white'>{grid.heading}</h1>
                        <p className='text-rich-black-200 '>{grid.description}</p>
                    </div>:<div className=' px-2 sm:px-0  flex flex-col justify-around h-full ' >
                        <div className=' text-3xl text-white gap-2'>
                            {grid.heading}
                            <AboutHighlightText child={grid.highlightText} gradient={"bg-gradient-1"}/>
                        </div>
                        <p className='text-rich-black-300'>{grid.description}</p>
                        <CTAbutton children={grid.BtnText} active={true} linkTo={grid.BtnLink}/>
                     </div>
                }

            </div>)
        }

    </div>
  )
}

export default LearningGrid