import PropTypes from "prop-types";
import CTAButton from './CTAButton';
import { TypeAnimation } from "react-type-animation";
import { FaArrowRight } from "react-icons/fa";

const CodeBlocks = ({
    position,
    heading,
    subHeading,
    ctabtn1,
    ctabtn2,
    codeblock,
    codeColor,
    bgGradient
}) => {
    return (
        <div className={`flex ${position} my-20 justify-center gap-10 relative`}>


            {/* section 1 */}
            <div className='md:w-[50%] flex flex-col gap-8'>
                <h1>
                    {heading}
                </h1>
                <h2 className='text-rich-black-300 font-bold '>
                    {subHeading}
                </h2>
                <div className='flex gap-7 mt-7'>
                    <CTAButton active={ctabtn1.active} linkTo={ctabtn1.linkTo}>
                        <div className='flex gap-1 md:gap-2 items-center'>
                            {ctabtn1.text}
                            <FaArrowRight />
                        </div>
                    </CTAButton>

                    <CTAButton active={ctabtn2.active} linkTo={ctabtn2.linkTo}>
                        {ctabtn2.text}
                    </CTAButton>
                </div>
            </div>

            {/* section 2 */}
            <div className="flex gap-2  h-fit flex-row w-[100%] py-4 lg:w-[500px] bg-[rgba(131,136,148,00.3)] rounded-[3px] border-2 border-rich-black-300 backdrop-blur-lg relative">
                {/* bg gradient */}
                <div className="absolute top-20 right-10 -z-10 h-[150px] w-[150px] rounded-full blur-[120px]"
                    style={{backgroundColor: bgGradient}}
                ></div>


                <div className="flex flex-col text-center w-[10%] text-rich-black-400 font-inter font-bold">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>
                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
                    <TypeAnimation
                    sequence={[codeblock, 2000, ""]}
                    repeat={Infinity}
                    cursor={true} 
                    omitDeletionAnimation={true}
                    style={{
                        whiteSpace:"pre-line",
                        display:"block"
                    }}/>
                </div>
            </div>
        </div>
    )
}

CodeBlocks.propTypes = {
    position: PropTypes.string,
    heading: PropTypes.element,
    subHeading: PropTypes.string,
    ctabtn1: PropTypes.object,
    ctabtn2: PropTypes.object,
    codeblock: PropTypes.object,
    codeColor: PropTypes.string,
    bgGradient: PropTypes.string
}

export default CodeBlocks