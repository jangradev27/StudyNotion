import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/Homepage/HighlightText";
import CTAButton from "../components/core/Homepage/CTAButton";
import CodeBlocks from "../components/core/Homepage/CodeBlocks";
import TimelineSection from "../components/core/Homepage/TimelineSection";
import LearningLanguageSection from "../components/core/Homepage/LearningLanguageSection";
import InstructorSection from "../components/core/Homepage/InstructorSection"
import Footer from "../components/common/footer";
import ExploreMore from "../components/core/Homepage/ExploreMore";


import Banner from "../assets/Images/banner.mp4";


const Home = () => {
  return (
    <div className='min-h-screen  bg-rich-black-900 flex flex-col font-inter  '>
        {/* SECTION 1 */}
        <section className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between">

            <Link to={"/signup"} className="h-fit mt-16">
                <div className="p-1 mx-auto rounded-full bg-rich-black-800 font-bold text-rich-black-200 transition duration-200 hover:scale-95 w-fit group [box-shadow:inset_0px_-1px_3px_-2px_white]">
                    <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-rich-black-900 transition duration-200">
                        <p>Become an Instructor </p>
                        <FaArrowRight />
                    </div>
                </div>
            </Link>

            <div className="w-[80%] flex flex-col items-center">
                <h1 className="text-center text-4xl font-semibold mt-4">
                    Empower Your Future with
                    <HighlightText text={"Coding Skills"} />
                </h1>

                <h2 className="w-[90%] text-center text-lg font-bold text-rich-black-300 mt-4">
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </h2>
            </div>

            <div className="flex flex-row gap-7 mt-8 ">
                <CTAButton active={true} linkTo={"/signup"}>
                    Learn More
                </CTAButton>

                <CTAButton active={false} linkTo={"/login"}>
                    Book a Demo
                </CTAButton>
            </div>

            <div className="shadow-blue-200 mx3 my-12 h-[80%] [box-shadow:5px_0px_10px_5px_lightblue]">
                <video
                muted
                loop
                autoPlay
                className="md:max-w-[1100px] [box-shadow:13px_13px_0px_0px_white]">
                    <source src={Banner} type="video/mp4" />
                </video>
            </div>

            {/* CODE SECTION 1 */}
            <div>
                <CodeBlocks
                position={"md:flex-row flex-col"}
                bgGradient={"yellow"}
                codeColor={"text-yellow-200"}
                heading={
                    <div className="text-4xl font-semibold">
                        Unlock your <HighlightText text="coding potential" /> with our online courses
                    </div>
                }
                subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                ctabtn1={{
                    text:"Try it Yourself",
                    linkTo:"/signup",
                    active:true
                }}
                ctabtn2={{
                    text:"Learn more",
                    linkTo:"/login",
                    active:false
                }}
                codeblock={`<!DOCTYPE html>\n<html lang="e">\n<head>\n<title>This is myPage</page>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one"> One </a> <a href="two"> Two </a> <a href="three"> Three </a>\n</nav>\n</body>`}
                />
            </div>

            {/* CODE SECTION 2 */}
            <div className="mt-10">
                <CodeBlocks
                position={"md:flex-row-reverse flex-col"}
                bgGradient={"cyan"}
                codeColor={"text-cyan-200"}
                heading={
                    <div className="text-4xl font-semibold">
                        Start <HighlightText text="coding in seconds" />
                    </div>
                }
                subHeading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                ctabtn1={{
                    text:"Continue lesson",
                    linkTo:"/signup",
                    active:true
                }}
                ctabtn2={{
                    text:"Learn more",
                    linkTo:"/login",
                    active:false
                }}
                codeblock={`<!DOCTYPE html>\n<html lang="e">\n<head>\n<title>This is myPage</page>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one"> One </a> <a href="two"> Two </a> <a href="three"> Three </a>\n</nav>\n</body>`}
                />
            </div>

            <div className="w-full">
                <ExploreMore />
            </div>
        </section>

        {/* SECTION 2 */}
        <section className="bg-pure-greys-5 text-rich-black-700 w-full">
            <div className="homepage_bg lg:h-[350px] md:h-[310px]">
                <div className="w-11/12 max-w-max flex items-center gap-5 mx-auto">
                    <div className="flex flex-row gap-7 text-white mt-[250px]">
                        <CTAButton active={true} linkTo={"/signup"}>
                            <div className="flex justify-center items-center gap-1 md:gap-2">
                                Explore full catalog <FaArrowRight />
                            </div>
                        </CTAButton>
                        <CTAButton active={false} linkTo={"/login"}>
                            <p>Learn more</p>
                        </CTAButton>
                    </div>
                </div>
            </div>

            <div className="w-11/12 mx-auto flex flex-col items-center justify-between gap-7 my-24">
                <div className="flex flex-col md:flex-row gap-8 mx-auto justify-center items-start ">
                    <div className="text-4xl text-center md:text-start font-semibold md:max-w-[600px]">
                        Get the skills you need for a <HighlightText text={"Job that is in Demand"} />
                    </div>
                    <div className="flex flex-col gap-10 md:w-[40%] items-center md:items-start">
                        <p>
                        The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </p>
                        <CTAButton active={true} linkTo={"/signup"}>
                            Learn more
                        </CTAButton>
                    </div>
                </div>
            <TimelineSection />

            <LearningLanguageSection />
            </div>

        </section>

        {/* SECTION 3 */}
        <section className="bg-rich-black-900 w-[80%] text-white mx-auto flex flex-col justify-between items-center gap-8 mb-8">
                <InstructorSection />
                
                <h2 className="text-center font-semibold text-4xl mt-10">
                    Reviews from other learners
                </h2>
        </section>

        <Footer/>

    </div>
  )
}

export default Home