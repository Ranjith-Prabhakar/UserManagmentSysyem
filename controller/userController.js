const express = require('express')
const userRouter = express()

//importing model
const UserModel = require('../model/userModel')
const { render } = require('ejs')


const getUserSingnUp = async (req, res) => {
    try {
        if (req.session.isLoggedIn) {
            res.redirect('/user/userHome')
        } else if (req.session.isAdmin) {
            res.redirect('/admin/adminPanel')
        } else if (!req.session.isLoggedIn && !req.session.isAdmin) {
            if (req.query.errorMessage) {
                res.render('userSignUp', { message:req.query.errorMessage })
            }else{
                res.render('userSignUp', { message: '' })
            }
        }
    } catch (error) {
        console.log(error.message);
    }
}

const postUserSingnUp = async (req, res) => {
    try {
        let validation = await UserModel.findOne({
            $or: [{
                username: req.body.username
            }, {
                email: req.body.email
            }]
        })
        if (!validation) {
            const saveUser = new UserModel({
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            })
            await saveUser.save()
            res.redirect('/login?successMessage=SignedUp Successfully. Login Now')
        } else {
            res.redirect('/user/userSingnUp?errorMessage=Invalid Username Or Password')
        }
    }
    catch (error) {
        console.log(error.message);
    }
}


const getUserHome = async (req,res)=>{
   try{ if(req.session.isLoggedIn){

        res.render('userHome',{userName:req.session.user})
        req.session.user=''
    }else{
        res.redirect('/login')
    }}
    catch(error){
        console.log(error.message);
    }
}

const postSignOut = async (req,res)=>{
    try {
        req.session.destroy((err)=>{
            if(err){
                console.log(err.message);
            }else{
                res.clearCookie('password')
                res.redirect('/login')
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}
module.exports = {
 
    getUserSingnUp,
    postUserSingnUp,
    getUserHome,
    postSignOut
}
