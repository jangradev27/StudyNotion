const Profile = require("../models/profile");
const User = require("../models/user");
const Course = require("../models/Course");
const uploadImage = require("../utils/ImageUpload");
const path = require("path");
const fs = require("fs");

exports.UpdateProfile = async (req, res) => {
    try {
        const { Gender, DOB, About } = req.body;
        const userId = req.user.id;

        if (!Gender || !DOB || !About || !userId) {
            return res.status(400).json({
                success: false,
                message: "Please enter all fields",
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const profileId = user.AdditionalDetails;
        const NewProfile = await Profile.findByIdAndUpdate(profileId, { Gender, DOB, About }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: NewProfile,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message,
        });
    }
};

exports.DeleteAccount = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.AccountType === "Student") {
            const AllCourse = user.Courses;
            for (let j = 0; j < AllCourse.length; j++) {
                const courseDetails = await Course.findById(AllCourse[j]);
                if (courseDetails) {
                    const updatedStudents = courseDetails.EnrolledStudents.filter((id) => id.toString() !== user._id.toString());
                    await Course.findByIdAndUpdate(AllCourse[j], { EnrolledStudents: updatedStudents });
                }
            }
        }

        await Profile.findByIdAndDelete(user.AdditionalDetails);
        await User.findByIdAndDelete(userId);

        return res.status(200).json({ success: true, message: "Account deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
    }
};

exports.getAllUserDetails = async (req, res) => {
    try {
        const id = req.user.id;
        const details = await User.findById(id).populate("AdditionalDetails").exec();

        return res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            data: details,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Error fetching user details",
            error: err.message,
        });
    }
};

exports.updateDisplayPicture = async (req, res) => {
    try {
        if (!req.files || !req.files.displayPicture) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;
        const image = await uploadImage(displayPicture, process.env.FOLDER_NAME, 1000, 1000);

        const tempFilePath = path.join(__dirname, "..", "uploads", displayPicture.name);

        if (!fs.existsSync(path.dirname(tempFilePath))) {
            fs.mkdirSync(path.dirname(tempFilePath), { recursive: true });
        }

        await displayPicture.mv(tempFilePath);

        const updatedProfile = await User.findByIdAndUpdate(
            userId,
            { image: image.secure_url },
            { new: true }
        );

        return res.json({
            success: true,
            message: "Image updated successfully",
            data: updatedProfile,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateUserName = async (req, res) => {
    try {
        const userID = req.user.id;
        const { firstname, lastname } = req.body;

        if (!firstname || !lastname) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userID,
            { firstname, lastname },
            { new: true }
        ).populate("AdditionalDetails").exec();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating user details",
        });
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        let userDetails = await User.findById(userId)
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                    populate: {
                        path: "subSections",
                    },
                },
            })
            .exec();

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        userDetails = userDetails.toObject();
        for (let i = 0; i < userDetails.courses.length; i++) {
            let totalDurationInSeconds = 0;
            let SubsectionLength = 0;

            for (let j = 0; j < userDetails.courses[i].courseContent.length; j++) {
                totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSections.reduce(
                    (acc, curr) => acc + parseInt(curr.timeDuration),
                    0
                );
                SubsectionLength += userDetails.courses[i].courseContent[j].subSections.length;
            }

            userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds);
            let courseProgressCount = await CourseProgress.findOne({
                courseID: userDetails.courses[i]._id,
                userId: userId,
            });

            courseProgressCount = courseProgressCount?.completedVideos.length || 0;
            userDetails.courses[i].progressPercentage = SubsectionLength
                ? Math.round((courseProgressCount / SubsectionLength) * 100 * 100) / 100
                : 100;
        }

        return res.status(200).json({
            success: true,
            message: "Enrolled courses fetched successfully",
            data: { enrolledCourses: userDetails.courses },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.instructorDashboard = async (req, res) => {
    try {
        const courseDetails = await Course.find({ instructor: req.user.id });

        const courseData = courseDetails.map((course) => ({
            _id: course._id,
            courseName: course.name,
            courseDescription: course.description,
            totalStudentsEnrolled: course.enrolledStudents.length,
            totalAmountGenerated: course.enrolledStudents.length * course.price,
        }));

        return res.status(200).json({
            success: true,
            message: "Instructor dashboard data fetched successfully",
            data: { courseData },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

function convertSecondsToDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
}
