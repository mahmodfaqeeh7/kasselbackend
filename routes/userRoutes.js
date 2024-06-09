const express = require('express')

// controller functions
const { loginUser, signupUser } = require('../control/userCon')

const router = express.Router()

router.post('/login', loginUser)

router.post('/signup', signupUser)

module.exports = router