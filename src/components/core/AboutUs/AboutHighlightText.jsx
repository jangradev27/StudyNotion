import React from "react"


const AboutHighlightText = ({child,gradient}) => {
  return (
    <span className={`font-semibold text-3xl inline  ${gradient}  bg-clip-text text-transparent`}>
        {" "}
        {child}
    </span>
  )
}



export default AboutHighlightText