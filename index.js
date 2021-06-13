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

const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI,
    { useNewUrlParser: true }).then(() => {
        app.listen(port, () => console.log('Up! :D'))
    }).catch((e) => {
        console.log(e)
    })



app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}));


app.set('view engine', 'ejs')

app.get('/', (req, res) => homeHandler(req, res))

app.get('/login', (req, res) => {res.render('login')})

app.get('/register', (req, res) => {res.render('register')})

app.get('/dash', (req, res) => {res.render('dash')})

app.post('/generate', (req, res) => generateHandler(req, res, shrinkobj))

app.get('/api/create', (req, res) => apiCreateHandler(req, res, shrinkobj))

app.get('/:kek', (req, res) => linkHandler(req, res, shrinkobj))


