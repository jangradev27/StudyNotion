import React from 'react'

const TimeDisplay = ({date,style}) => {
    const newDate= new Date(date).toLocaleDateString("en-In",{
        month:'short',
        year:'numeric',
        day:"2-digit"
    })

    const time=new Date(date).toLocaleTimeString("en-In",{
        hour:"2-digit",
        minute:"2-digit",
        hour12:true
    })
  return (
    <span className={`${style}`}> Created: {newDate} | {time} </span>
  )
}

export default TimeDisplay