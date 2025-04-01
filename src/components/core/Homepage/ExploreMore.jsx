import { useState } from "react"
import {HomePageExplore} from "../../../data/homepage-explore"
import HighlightText from "./HighlightText"
import CourseCard from "./CourseCard"

const tabs = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabs[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCard = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course)=>course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }
  return (
    <div className="flex flex-col items-center h-[70rem] lg:h-[20rem] relative mb-40">
        <h1 className="text-4xl font-semibold text-center my-3">
            Unlock the <HighlightText text="Power of Code" />
        </h1>
        <p className="text-rich-black-300 text-lg font-medium mt-3 text-center">
            Learn to Build Anything You Can Imagine
        </p>

        <div className="lg:flex hidden  flex-row items-center gap-4 p-1 mt-7 mb-16  rounded-full bg-rich-black-800 border-[1px] border-rich-black-300 justify-center">
            {
                tabs.map((item, index)=>{
                    return(
                        <button key={index}
                        className={`text-[16px] ${currentTab === item ? "bg-rich-black-900 text-rich-blac-5 font-medium" : "text-rich-black-50"} rounded-full transition duration-200 cursor-pointer hover:bg-rich-black-900 hover:text-rich-black-5 px-6 py-2 `}
                        onClick={() => setMyCard(item)}>
                            {item}
                        </button>
                    )
                })
            }
        </div>

        <div className="flex flex-col gap-[3rem]   lg:flex-row w-[100%] items-center justify-center lg:justify-between absolute translate-y-[20rem] lg:translate-y-[15rem] ">
            {
                courses.map((item, index)=> {
                    return(
                        <CourseCard key={index} 
                        Heading = {item.heading}
                        description={item.description}
                        level={item.level}
                        lessionNumber={item.lessionNumber}
                        onclick = {setCurrentCard}
                        currentCard={currentCard} />
                    )
                })
            }
        </div>
    </div>
  )
}

export default ExploreMore