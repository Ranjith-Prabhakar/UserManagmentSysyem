const express = require('express')
const commonRouter = express.Router()

// import commonController
const commonController = require('../controller/commonController')


commonRouter.get('/',commonController.getDefault)
commonRouter.get('/login',commonController.getlogin)
commonRouter.post('/login',commonController.postlogin)
module.exports = commonRouter