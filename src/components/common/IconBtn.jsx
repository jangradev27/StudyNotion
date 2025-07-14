import React from 'react'


const IconBtn = ({text,onclick,children,disabled,customClasses,type,icon}) => {
  return (
    <button className={`${customClasses}  gap-2`} disabled={disabled} onClick={onclick} type={type}>
        {
            children?(<><span>{text}</span>{children}</>):(text)
        }
        {
          icon?(icon):(<></>)
        }
    </button>
  )
}

export default IconBtn