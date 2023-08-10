const express = require('express')
const userRouter = express.Router()
const userController = require('../controller/userController')



userRouter.get('/userSingnUp',userController.getUserSingnUp)
userRouter.post('/userSingnUp',userController.postUserSingnUp)

userRouter.get('/userhome',userController.getUserHome)

userRouter.post("/signout",userController.postSignOut)

module.exports = userRouter