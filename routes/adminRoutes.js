const express = require('express')
const adminRouter = express.Router()

// import admin controller
const adminController = require('../controller/adminController')

adminRouter.get('/adminPanel', adminController.getAdminPanel)
adminRouter.post('/signout', adminController.postSignOut)
adminRouter.post('/search', adminController.postSearch)
adminRouter.post('/edit', adminController.postEdit)
adminRouter.post('/saveEdit', adminController.postSaveEdit)
adminRouter.get('/editUserConfirm',adminController.editUserConfirm)
adminRouter.post('/delete', adminController.postDelete)
adminRouter.get('/DeleteUserConfirm', adminController.DeleteUserConfirm)
adminRouter.get('/create', adminController.CreateUser)
adminRouter.post('/create', adminController.postCreateUser)

module.exports = adminRouter