const express = require('express')

// controller functions
const { showAll,TeacherCourses, showCourse ,AddCourse, studentCourses,createCourse , updateCourse,deleteCourse } = require('../control/courseCon.js')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

router.get("/",showAll)
router.get("/teacheronly/:id",TeacherCourses)

router.get("/studentcourses/:id",studentCourses)


router.get("/:id",showCourse)

router.put("/addcourse/:studentid",AddCourse)

router.post("/",createCourse)

router.put("/",updateCourse)

router.delete("/",deleteCourse)
module.exports = router 