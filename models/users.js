const mongoose = require('mongoose')


const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  mycourses:
   [{
     type: mongoose.Schema.Types.ObjectId, ref: 'Course'
     }
    ]
  ,
  isTeacher: {
    type: Boolean,
    default: false
  }


})



module.exports = mongoose.model('user', userSchema)