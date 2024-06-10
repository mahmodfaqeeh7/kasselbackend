const User = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
  }
  
const loginUser = async (req, res) => {
    const inform = req.body
    const email = inform.email
    const password = inform.password
    console.log(email+password)
    try {
   
  
        const user = await User.findOne({ email })
        if (!user) {
          return res.status(400).json({ error: 'Invalid email' });
      }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
          return res.status(400).json({ error: 'Invalid password' });
      }
    
        
        // create a token
        const token = createToken(user._id)
    
        res.status(200).json({mycourses: user.mycourses,
          isTeacher : user.isTeacher,
          id :user._id, email,username : user.username, token})
      } catch (error) {
        res.status(400).json({error: error.message})
      }

}


const signupUser = async (req, res) => {
    const {email,username, password} = req.body
  
    try {
     
     
    
    
    
      const exists = await User.findOne({ email })
    
      if (exists) {
        return res.status(400).json({ error: 'Invalid email' });
      }
    
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
    
      const user = await User.create({ email,username,password: hash })
      // create a token
      const token = createToken(user._id)
  
      res.status(200).json({mycourses: user.mycourses,
         id :user._id,email,
         isTeacher : user.isTeacher,
        username : user.username,
         token})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
  
  module.exports = { signupUser, loginUser }
