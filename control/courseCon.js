const Course = require('../models/Course.js')
const User = require('../models/users.js')



const showAll = async (req, res) => {
    try {
        const data=await Course.find()
        res.json(data)
      } 
      catch (error) {
        res.status(500).json({error:"an error fetching course"})
      }
}

const TeacherCourses = async (req, res) => {
    try {
        const {id }= req.params
        console.log(id)
        const data=await Course.find( {CreatedBy : id})
        res.json(data)
      } 
      catch (error) {
        res.status(500).json({error:"an error fetching course"})
      }
}


const studentCourses = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await User.findById(id).populate('mycourses');
    if (!student) {
      return res.status(404).send('Student not found');
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

const showCourse = async (req, res) => {

    try {
        const courseid= req.params.id
        
        const data=await Course.findById({_id: courseid})
        res.json(data)
      } catch (error) {
        res.status(500).json({error:"an error fetching course"})
      }
}



const AddCourse = async (req, res) => {
      const {studentid } = req.params;
      const  courseid  = req.body.courseid;

      try {
        const student = await User.findById(studentid);
        if (!student) {
          console.log('Student not found')

          return res.status(404).send('Student not found');
        }
    
        const course = await Course.findById({_id: courseid})
        if (!course) {
          console.log('Course not found')
          return res.status(404).send('Course not found');
        }
    
        await User.updateOne(
          { _id: student._id },
          { $push: { mycourses: courseid } }
        );
        res.status(200).send('Course added to student\'s courses');
      } catch (error) {
        res.status(500).send(error.message);
      }
    }

const createCourse = async (req, res) => {
    try {
        console.log(req.body);
    
         const title = req.body.title
         const description= req.body.description
         const CreatedBy = req.body.CreatedBy
    
        await Course.create({title,description,CreatedBy});
        res.json("Data Submitted");
      } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching course." });
      }
}


const updateCourse = async (req, res) => {
    try {

      console.log(req.body)
        const courseid = req.body.courseid;
    
        const updatecourse = {
            title: req.body.title,
            description: req.body.description,
            
        }
    
    
        await Course.findByIdAndUpdate(courseid, updatecourse)
        res.json("Data Submitted");
      } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching course." });
      }
}

const deleteCourse = async (req, res) => {
  const courseid = req.body.courseid;
  console.log(courseid)
    try {
      await Course.findByIdAndDelete({_id: courseid});
      res.json("How dare you!" + req.body.courseid);
    } catch (error) {
      res.json(error);
    }

}

module.exports = { showAll,TeacherCourses,studentCourses, showCourse ,AddCourse,createCourse,updateCourse,deleteCourse }
