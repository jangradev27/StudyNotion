import InstructorImage from "../../../assets/Images/Instructor.png";
import HighlighText from "./HighlightText";
import CTAButton from "./CTAButton";
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className="mt-18 w-full">
        <div className="flex w-full flex-col md:flex-row gap-20 items-center">

            <div className="md:w-[50%]">
                <img src={InstructorImage} alt="" 
                className=" "/>
            </div>

            <div className="md:w-1/2 flex flex-col gap-4">
                <p className="text-4xl font-semibold">
                    Become an <br /> <HighlighText text={"Instructor"} />
                </p>

                <p className="font-medium text-base text-rich-black-300">
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </p>

                <CTAButton active={true} linkTo={"/signup"}>
                    <div className="flex gap-4 items-center">
                        Start Teaching Today <FaArrowRight/>
                    </div>
                </CTAButton >
            </div>

        </div>
    </div>
  )
}

export default InstructorSection