const Course=require("../models/Course");
const Category=require("../models/Category");
const User=require("../models/user")
const {Uploader}=require("../utils/ImageUpload");
const dotenv=require("dotenv")
dotenv.config()

exports.createCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    let {
      CourseName,
      CourseDescription,
      WhatLearn,
      price,
      tag: _tag,
      category,
      status,
      instructions,
    } = req.body;

    const thumbnail = req.files?.thumbnailImage;

    const tag = JSON.parse(_tag);

    if (
      !CourseName ||
      !CourseDescription ||
      !WhatLearn ||
      !price ||
      !tag.length ||
      !thumbnail ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    if (!status) status = "Draft";

    const instructorDetails = await User.findById(userId);
    if (!instructorDetails || instructorDetails.accountType !== "Instructor") {
      return res.status(404).json({ success: false, message: "Instructor not found" });
    }

    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

    const newCourse = await Course.create({
      CourseName,
      CourseDescription,
      Instructor: instructorDetails._id,
      WhatLearn,
      price,
      tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status,
      instructions,
    });

    await User.findByIdAndUpdate(
      userId,
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    await Category.findByIdAndUpdate(
      category,
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Created Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};
 



// getall course\
exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      { status: "Published" },
      {
        CourseName: true,
        price: true,
        thumbnail: true,
        Instructor: true,
        RatingReviews: true,
        EnrolledStudents: true,
      }
    )
      .populate("Instructor")
      .exec();

    res.status(200).json({
      success: true,
      data: allCourses,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: `Can't fetch course data`,
      error: error.message,
    });
  }
};


const convertSecondsToDuration = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "Instructor",
        populate: { path: "additionalDetails" },
      })
      .populate("category")
      .populate("RatingReviews")
      .populate({
        path: "CourseContent",
        populate: {
          path: "Subsection",
          select: "-VideoUrl",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: `Course not found with ID: ${courseId}`,
      });
    }

    let totalDurationInSeconds = 0;
    courseDetails.CourseContent.forEach((section) => {
      section.Subsection.forEach((sub) => {
        totalDurationInSeconds += parseInt(sub.TimeDuration);
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


exports.editCourse = async (req, res) => {
    try {
        const { CourseId } = req.body;
        const updates = req.body;

        const course = await Course.findById(CourseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        for (const key in updates) {
            if (key !== "thumbnail") {
                course[key] = updates[key];
            }
        }

        if (req.files && req.files.thumbnail) {
            const newThumbnail = await Uploader(req.files.thumbnail, process.env.PhotoFolderName);
            course.thumbnail = newThumbnail.secure_url;
        }

        await course.save();

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: course,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
};


exports.getFullCourseDetails = async (req, res) => {
    try {
        const { CourseId } = req.body;

        const course = await Course.findById(CourseId)
            .populate({
                path: "Instructor",
                populate: {
                    path: "AdditonalDetails",
                },
            })
            .populate("Category")
            .populate("RatingReviews")
            .populate({
                path: "CourseContent",
                populate: {
                    path: "Subsection",
                },
            });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        let totalDuration = 0;
        course.CourseContent.forEach(content => {
            content.Subsection.forEach(sub => {
                totalDuration += parseFloat(sub.timeDuration || 0);
            });
        });

        return res.status(200).json({
            success: true,
            message: "Course fetched successfully",
            data: { ...course.toObject(), totalDuration },
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
};


exports.getInstructorCourses = async (req, res) => {
    try {
     
        const instructorId = req.user.id;

        const courses = await Course.find({ Instructor: instructorId })
            .sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            message: "Instructor courses fetched successfully",
            data: courses,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
};


exports.deleteCourse = async (req, res) => {
    try {
        const { CourseId } = req.body;

        const course = await Course.findById(CourseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        // Remove course from instructor's list
        await User.findByIdAndUpdate(course.Instructor, {
            $pull: { Courses: CourseId }
        });

        // Remove ratings, content, and sections related to this course
        await Promise.all([
            RatingReview.deleteMany({ Course: CourseId }),
            Section.deleteMany({ CourseId }),
            Subsection.deleteMany({ CourseId })
        ]);

        await course.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
};



exports.getAllCourses = async (req, res) => {
    try {
        const Courses = await Course.find({ Status: "Published" })
            .populate("Instructor")
            .populate("Category")
            .exec();

        return res.status(200).json({
            success: true,
            message: "Courses fetched successfully",
            data: Courses,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
};
