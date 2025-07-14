const  express=require("express")
const router = express.Router();

// importing course controllers
const {createCourse,getAllCourses,getCourseDetails, editCourse, getInstructorCourses, deleteCourse, getFullCourseDetails}=require("../controllers/course.js");

// importing section controllers
const {CreateSection,UpdateSection,DeleteSection}=require("../controllers/sections.js")

// importing sub-section controllers
const {CreateSubSection,UpdateSubSection,deleteSubsection}=require("../controllers/Subsection.js")

// importing tag controllers
const {CreateCategory,getCourseCategory, getAllCategory}=require("../controllers/category.js")

// importing course progress controller
const {UpdateCourseProgess}=require("../controllers/courseProgess.js")

// importing middlewares
const{isAuth,isAdmin,isInstructor,isStudent}=require("../middlewares/Auth.js")

const {createRating,getAverageRating,getAllRating, getCourseRating}=require("../controllers/RatingAndReviews.js")

// ------------------- COURSE ROUTES -------------------
// create course
router.post("/CreateCourse",isAuth, isInstructor, createCourse);

// get all courses
router.get("/getAllCourse", isAuth,getAllCourses);

router.post("/getCourseDetails",getCourseDetails);

router.post("/getFullCourseDetails",isAuth,getFullCourseDetails)

router.put("/UpdateCourseProgress", isAuth, isStudent,UpdateCourseProgess);

router.put("/editCourse",isAuth,isInstructor,editCourse)

router.get("/getInstructorCourses",isAuth,isInstructor,getInstructorCourses)

router.delete("/deleteCourse",deleteCourse);
// ------------------- SECTION ROUTES -------------------
// creat section
router.post("/CreateSection", isAuth, isInstructor, CreateSection);

// update section
router.put("/UpdateSection", isAuth, isInstructor, UpdateSection);

// delete section
router.delete("/DeleteSection", isAuth, isInstructor, DeleteSection);


// ------------------- SUB-SECTION ROUTES -------------------
// create sub-section
router.post("/CreateSubSection", isAuth, isInstructor, CreateSubSection);

// update sub-section
router.put("/UpdateSubSection", isAuth, isInstructor, UpdateSubSection);

// delete sub-section
router.delete("/DeleteSubSection", isAuth, isInstructor, deleteSubsection);


// ------------------- CATEGORY ROUTES [ADMIN ONLY] -------------------
// create tag
router.post("/CreateCategory", isAuth, isAdmin, CreateCategory);
router.post("/getCourseCategory",getCourseCategory);
// show all tags -[not admin]
router.get("/AllCategory", getAllCategory);

router.post("/createRating",isAuth,isStudent,createRating);
router.post("/getAverageRating",getAverageRating);
router.get("/getReviews",getAllRating);

router.post("/getCourseRating",getCourseRating);

// export router
module.exports=router;