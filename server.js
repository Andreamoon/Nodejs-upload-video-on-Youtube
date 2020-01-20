const express = require('express');
const app = express();
const uploadRoutes = require('./routes/upload-route')
const authRoutes = require('./routes/authRoutes')
var flash = require('connect-flash');
var session = require('express-session');

//setup template ejs
app.set('view engine', "ejs")

app.use(flash());

app.use(session({
    cookie: {
        maxAge: 60000
    },
    secret: 'woot',
    resave: false,
    saveUninitialized: false
}));
app.use('/upload', uploadRoutes)
app.use('/auth', authRoutes)
    //public folder
app.use(express.static('./public'))
app.get('/', (req, res) => {
    res.render('home')
});

app.listen(5000, () => {
    console.log('app listen on port 5000')
})

module.exports = app