const express = require('express')
const userRouter = express()
const UserModel = require('../model/userModel')

const getAdminPanel = async (req, res) => {
    try {
        if (req.session.isAdmin) {
            if (req.query.search) {
                res.render('adminPanel', { search: await UserModel.find({ name: { $regex: new RegExp(`^${req.query.search}`, 'i') } }), edit: '', searchPanel: '', user: '', editUser: '', deleteUser: '', create: '' })
            } else if (req.query.edit) {
                res.render('adminPanel', { edit: await UserModel.findOne({ _id: req.query.edit }), search: '', searchPanel: '', editUser: '', deleteUser: '', user: '', create: '' }) //searchPanel: '**'
            }
            else if (req.query.editUser) {
                console.log('im in edit user router function');
                res.render('adminPanel', { editUser: true, edit: '', searchPanel: '', user: '', search: '', deleteUser: '', create: '' })
            }
            else if (req.query.deleteUser) {
                res.render('adminPanel', { deleteUser: true, editUser: "", edit: '', searchPanel: '', user: '', search: '', create: '' })
            }
            else if (req.query.create) {
                console.log('im in get admin panel=> req.query.create', req.query.create)
                res.render('adminPanel', { create: req.query.create, deleteUser: '', editUser: "", edit: '', searchPanel: '', user: '', search: '' })
            }
            else {
                res.render('adminPanel', { user: await UserModel.find(), search: '', edit: '', searchPanel: '', editUser: '', deleteUser: '', create: '' })
            }

        } else {
            res.redirect('/login')
        }
    } catch (error) {
        console.log(error.message);
    }
}

const postSignOut = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) console.log(err.message);
            else {
                res.clearCookie('password')
                res.redirect('/login')
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}

const postSearch = async (req, res) => {
    try {
        res.redirect(`/admin/adminPanel?search=${req.body.search}`,)
    } catch (error) {
        console.log(error.message);
    }
}

const postEdit = async (req, res) => {
    try {
        res.redirect(`/admin/adminPanel?edit=${req.body.edit}`)
    } catch (error) {
        console.log(error.message);
    }
}

const postSaveEdit = async (req, res) => {
    try {
        console.log(req.body);
        req.session.editUser = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            isAdmin: req.body.isAdmin
        }
        res.redirect(`/admin/adminPanel?editUser=true`)
    } catch (error) {
        console.log(error.message);

    }
}

const editUserConfirm = async (req, res) => {
    try {
        if (!req.session.editUser.id) {
            res.redirect('/admin/adminPanel')
        }
        else {
            await UserModel.replaceOne({ _id: req.session.editUser.id }, {
                name: req.session.editUser.name,
                email: req.session.editUser.email,
                username: req.session.editUser.username,
                password: req.session.editUser.password,
                isAdmin: req.session.editUser.isAdmin
            })
            req.session.editUser = {}
            res.redirect('/admin/adminPanel')
        }
    } catch (error) {
        console.log(error.message);
    }
}



const postDelete = async (req, res) => {
    try {
        req.session.deleteUser = req.body.delete

        res.redirect('/admin/adminPanel?deleteUser=true')
    } catch (error) {
        console.log(error.message);
    }
}

const DeleteUserConfirm = async (req, res) => {
    if (!req.session.deleteUser) {
        res.redirect(`/admin/adminPanel`)
    } else {
        await UserModel.deleteOne({ _id: req.session.deleteUser })
        req.session.deleteUser = 0
        res.redirect(`/admin/adminPanel`)
    }
}

const CreateUser = (req, res) => {
    try {
        res.redirect('/admin/adminPanel?create= true')
    } catch (error) {
        console.log(error.message);
    }
}

const postCreateUser = async(req,res)=>{
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
            res.redirect("/admin/adminPanel")
        } else {
            res.redirect('/admin/adminPanel?create=Username Or Email Already Exist')
        }
    }
    catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    getAdminPanel,
    postSignOut,
    postSearch,
    postEdit,
    postSaveEdit,
    editUserConfirm,
    postDelete,
    DeleteUserConfirm,
    CreateUser,
    postCreateUser
}