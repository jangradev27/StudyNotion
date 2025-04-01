import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";

const timeline = [
    {
        Logo: Logo1,
        Heading: "Leadership",
        Description: "Fully committed to the success company",
    },
    {
        Logo: Logo2,
        Heading: "Leadership",
        Description: "Fully committed to the success company",
    },
    {
        Logo: Logo3,
        Heading: "Leadership",
        Description: "Fully committed to the success company",
    },
    {
        Logo: Logo4,
        Heading: "Leadership",
        Description: "Fully committed to the success company",
    },
];

const TimelineSection = () => {
    return (
        <div className="mb-20 mt-5">
            <div className="flex flex-col md:flex-row gap-14 md:items-center">
                {/* left box */}
                <div className="md:w-[45%] flex flex-col gap-10 ">
                    {timeline.map((item, index) => {
                        return (
                            <div key={index} className="flex flex-row gap-6">
                                <div className="h-[50px] w-[50px] bg-white flex items-center">
                                    <img src={item.Logo} alt="" />
                                </div>

                                <div>
                                    <h2 className="font-semibold text-[18px]">{item.Heading}</h2>
                                    <p className="text-base">{item.Description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* right part */}
                <div className="relative shadow-blue-200 shadow-md">
                    <img
                        src={timelineImage}
                        alt="Timeline Image"
                        className="shadow-white shadow-sm object-cover"
                    />

                    <div className="absolute bg-caribbean-green-700 flex flex-row text-white uppercase py-5 md:py-10 left-1/2 -translate-x-1/2 -bottom-16">
                        
                        <div className="flex flex-row gap-2 md:gap-5 items-center border-r-caribbean-green-300 border-r-2 px-5">
                            <p className="text-2xl md:text-3xl font-bold">10</p>
                            <p className="text-caribbean-green-300 text-xs md:text-sm min-w-[100px] ">
                                Years of Experience
                            </p>
                        </div>

                        <div className="flex flex-row items-center gap-2 md:gap-5 px-5">
                            <p className="text-2xl md:text-3xl font-bold">250</p>
                            <p className="text-caribbean-green-300 text-xs md:text min-w-[100px] ">
                                Types of Courses
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimelineSection;
