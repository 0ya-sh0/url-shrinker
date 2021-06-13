const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const homeHandler = require('./handlers/home')
const apiCreateHandler = require('./handlers/api_create')
const linkHandler = require('./handlers/link_handler')
const generateHandler = require('./handlers/generate')
const shrinkobj = require('./models/shrinkSchema');
const userModel = require('./models/user');
const MONGO_URI = process.env.MONGO_URI
const COOKIE_SECRET = process.env.COOKIE_SECRET

mongoose.connect(MONGO_URI,
    { useNewUrlParser: true }).then(() => {
        app.listen(port, () => console.log('Up! :D'))
    }).catch((e) => {
        console.log(e)
    })

const session = require("express-session")
const filestore = require("session-file-store")(session)



app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    name: "session",
    secret: COOKIE_SECRET, // Secret key,
    saveUninitialized: false,
    resave: false,
    store: new filestore({ logFn: () => { } })
}))

app.set('view engine', 'ejs')


function isLoggedIn(req) {
    if (!req.session || !req.session.username || !req.session.isLoggedIn) {
        return false;
    }
    return true;
}

app.get('/', (req, res) => {
    if (!isLoggedIn(req)) {
        homeHandler(req, res);
        return;
    }
    res.render('dash', { username: req.session.username })
})

app.get('/login', (req, res) => {
    res.render('login', { failed: !!req.query.failed })
})

app.post('/login', async (req, res) => {
    const reqUsername = req.body.username;
    const reqPassword = req.body.password;
    const result = await userModel.findOne({ username: reqUsername });
    if (!result || result.password != reqPassword) {
        res.redirect('/login?failed=1');
        return;
    }
    req.session.isLoggedIn = true;
    req.session.username = reqUsername;
    res.redirect('/');
})

app.get('/register', (req, res) => { res.render('register', { failed: !!req.query.failed }) })

app.post('/register', async (req, res) => {
    const reqUsername = req.body.username;
    const reqPassword = req.body.password;
    const result = await userModel.findOne({ username: reqUsername });
    if (result) {
        res.redirect('/register?failed=1');
        return;
    }
    const newUser = new userModel({ username: reqUsername, password: reqPassword });
    await newUser.save();
    req.session.isLoggedIn = true;
    req.session.username = reqUsername;
    res.redirect('/');
})


app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.session = null;
        res.clearCookie('session');
        res.redirect('/');
    })
})


function auth(req, res, next) {
    if (!isLoggedIn(req)) {
        res.redirect('/login');
        return;
    }
    next()
}

app.post('/generate', (req, res) => generateHandler(req, res, shrinkobj))

app.get('/api/create', (req, res) => apiCreateHandler(req, res, shrinkobj))

app.get('/:kek', (req, res) => linkHandler(req, res, shrinkobj))


