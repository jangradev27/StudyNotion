const  express=require("express")
const router = express.Router();

// importing course controllers
const {CreateCourse,getAllcourse,getCourseDetails}=require("../controllers/course.js");

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



// ------------------- COURSE ROUTES -------------------
// create course
router.post("/CreateCourse",isAuth, isInstructor, CreateCourse);

// get all courses
router.get("/getAllCourse", isAuth,getAllcourse);

// update course progress
router.post("/UpdateCourseProgress", isAuth, isStudent,UpdateCourseProgess);


// ------------------- SECTION ROUTES -------------------
// creat section
router.post("/CreateSection", isAuth, isInstructor, CreateSection);

// update section
router.post("/UpdateSection", isAuth, isInstructor, UpdateSection);

// delete section
router.post("/DeleteSubSection", isAuth, isInstructor, DeleteSection);


// ------------------- SUB-SECTION ROUTES -------------------
// create sub-section
router.post("/CreateSubSection", isAuth, isInstructor, CreateSubSection);

// update sub-section
router.post("/UpdateSubSection", isAuth, isInstructor, UpdateSubSection);

// delete sub-section
router.post("DeleteSubSection", isAuth, isInstructor, deleteSubsection);


// ------------------- CATEGORY ROUTES [ADMIN ONLY] -------------------
// create tag
router.post("/CreateCategory", isAuth, isAdmin, CreateCategory);

// show all tags -[not admin]
router.get("/AllCategory", getAllCategory);


// export router
module.exports=router;