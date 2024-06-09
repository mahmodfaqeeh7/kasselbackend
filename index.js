const cors =require('cors')
require('dotenv/config')
const express=require('express')
const connectDB=require('./connectDB.js')
const UsersRoute = require('./routes/userRoutes.js')
const CourseRoute = require('./routes/courseRoutes.js')



const app=express()
const PORT=process.env.PORT || 8000
connectDB()
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})



app.use("/api/users" , UsersRoute)

app.use("/api/courses" , CourseRoute)


app.get("/",(req,res)=>{
    res.json("hi there")
})

app.listen(PORT,()=>{
    console.log(`server is running on port: ${PORT} `)
})
