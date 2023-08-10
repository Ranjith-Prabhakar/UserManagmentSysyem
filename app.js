//express 
const express = require('express')
const app = express()
const port = 3000
app.listen(port, () => console.log(`server is running on port  http://localhost:3000`))

//mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/usermgdb')
    .then(() => console.log('db also connected'))
    .catch((error) => console.log(error.message))

//session and cookie
const session = require('express-session')
const cookieParser = require('cookie-parser')

//routers
const userRouter = require('./routes/userRoutes')
const adminRouter = require('./routes/adminRoutes')
const commonRouter = require('./routes/commonRouter')

//static files
// app.use(express.static('public'))
app.use(express.static('node_modules/bootstrap/dist'))

//view engine
app.set('view engine', 'ejs')

//loger code written by me
const logger = (req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
};

app.use(logger)
//body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// session activation
app.use(session({
    secret: 'this is the secret',
    resave: false,
    saveUninitialized: true
}))

// cookie activation
app.use(cookieParser())

//clearing cache
app.use((req, res, next) => {
    res.set('cache-control', 'no-cache,no-store')
    next()
})

//user Router

app.use('/user', userRouter)

//admin Router

app.use('/admin', adminRouter)

//common Router

app.use('/', commonRouter)

