import React from 'react'
import AboutHighlightText from './AboutHighlightText'

const Paragraph = ({child ,gradient,para,para2}) => {
  return (
    <div className='flex flex-col p-2  gap-5 lg:w-[486px]'>
        <AboutHighlightText child={child} gradient={gradient}/>
        <p className='text-rich-black-300   text-start'>{para}</p>
        {
          para?(<p className='text-rich-black-300 text-start'>{para2}</p>):<></>
        }
    </div>
  )
}

export default Paragraph;