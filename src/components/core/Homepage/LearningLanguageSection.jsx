import HighlightText from "./HighlightText"
import knowProgress from "../../../assets/Images/Know_your_progress.png"
import compareOthers from "../../../assets/Images/Compare_with_others.svg"
import planLessons from "../../../assets/Images/Plan_your_lessons.svg"
import CTAButton from "./CTAButton"


const LearningLanguageSection = () => {
  return (
    <div className="  mt-20" id="learning">
        <div className="flex flex-col gap-2 md:gap-4 justify-center items-center">
            <h1 className="text-4xl font-semibold text-center">
                Your swiss knife for <HighlightText text="learning any language" />
            </h1>
            <h2 className="text-center text-gray-800 mx-auto text-base mt-2 font-medium w-[80%]">
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </h2>

            <div className="flex flex-col justify-center   lg:flex-row  mt-5 md:mt-2 gap-[1rem] lg:gap-0 lg:px-20">
                <img src={knowProgress} 
                className="object-contain mt-8   md:-mr-20  " alt="" />
                <img src={compareOthers} 
                className="object-contain     " alt="" />
                <img src={planLessons} 
                className="object-contain   md:-ml-32 " alt="" />
            </div>
            <CTAButton active={true} linkTo={"/signup"} className=" md:mt-2" >
                Learn more
            </CTAButton>
        </div>
    </div>
  )
}

export default LearningLanguageSection