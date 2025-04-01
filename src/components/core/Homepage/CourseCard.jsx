import PropTypes from "prop-types"
import { IoMdPeople } from "react-icons/io";
import { FaSitemap } from "react-icons/fa";

const CourseCard = ({Heading, description, level, lessionNumber, onclick, currentCard}) => {
  return (
    <button onClick={()=>onclick(Heading)}
    className={`${Heading === currentCard ? "bg-rich-black-5 [box-shadow:15px_15px_0px_0px_yellow]" : "bg-rich-black-800"} flex   flex-col sm:w-[30rem] lg:w-[30%] h-fit`}>
        <div className="flex flex-col gap-4 mt-6 pb-16 px-6 items-start border-dashed border-b-2 border-rich-black-500">
            <h1 className={`${Heading === currentCard ? "text-rich-black-900" : "text-rich-black-25"} text-xl font-semibold`}>
                {Heading}
            </h1>
            <p
            className={`${Heading === currentCard ? "text-rich-black-600" : "text-rich-black-300"} h-[7rem] text-start`}>
                {description}
            </p>
        </div>
        <div className="px-6 py-4 flex flex-row justify-between mb-3">
            <div className={`${Heading === currentCard ? "text-blue-400" : "text-rich-black-500"} flex flex-row items-center justify-start gap-5 text-[16px] font-medium`}>
                <IoMdPeople className="text-xl" />
                <p>
                    {level}
                </p>
            </div>

            <div className={`${Heading === currentCard ? "text-blue-400" : "text-rich-black-500"} flex flex-row items-center justify-start gap-5 text-[16px] font-medium`}>
                <FaSitemap className="text-xl"  />
                <p>
                    {lessionNumber}
                </p>
            </div>
        </div>
    </button>
  )
}

CourseCard.propTypes = {
    Heading: PropTypes.string,
    description: PropTypes.string,
    level: PropTypes.string,
    lessionNumber: PropTypes.number,
    onclick: PropTypes.func,
    currentCard: PropTypes.string
}

export default CourseCard