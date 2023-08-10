const express = require('express')
const commonController = express()
const UserModel = require('../model/userModel')



const getDefault = async (req, res) => {
    try {
        if (req.session.isLoggedIn) {
            res.redirect('/user/userHome')
        } else if (req.session.isAdmin) {
            res.redirect('/admin/adminPanel')
        } else if (!req.session.isLoggedIn && !req.session.isAdmin) {
            res.redirect('/login')
        }
    } catch (error) {
        console.log(error.message);
    }
}

const getlogin = async (req, res) => {
    try {
        if (req.session.isLoggedIn) {
            res.redirect('/user/userHome')
        } else if (req.session.isAdmin) {
            res.redirect('/admin/adminPanel')
        } else if (!req.session.isLoggedIn && !req.session.isAdmin) {
            if (req.query.errorMessage) {
                res.render('Login', { message: req.query.errorMessage })
            }else if(req.query.successMessage){
                res.render('Login', { message: req.query.successMessage })
            } 
            else {
                res.render('Login', { message: '' })
            }
        }
    }
    catch (error) {
        console.log(error.message);
    }
}

const postlogin = async (req, res) => {
    try {
        const validation = await UserModel.findOne({ username: req.body.username, password: req.body.password })
        if (!validation) {
            res.redirect('/login?errorMessage=Invalid Username Or Password')
        } else if (validation.isAdmin) {
            req.session.isAdmin = true
            res.cookie("password", req.body.password)
            res.redirect('/admin/adminpanel')//
        } else {
            req.session.isLoggedIn = true;
            req.session.user = validation.name
            res.cookie("password", req.body.password)
            res.redirect('/user/userhome')
        }

    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    getDefault,
    getlogin,
    postlogin
}