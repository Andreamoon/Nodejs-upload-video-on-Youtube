const express = require('express');
const app = express();
const authRoutes = require('./routes/auth-route')
const multer = require('multer')
const path = require('path')

const passportSetup = require('./config/passport-setup')

//Set store engine
const storage = multer.diskStorage({
    destination: './public/videos',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));


    }
})

//Init Upload

const upload = multer({
    storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myVideo');

//chekcfile type

function checkFileType(file, cb) {
    //permetti extensions
    const fileTypes = /mp4/;
    //check extension
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    //check Mime 
    const mimeType = fileTypes.test(file.mimeType)
    if (mimeType && extname) {
        return cb(null, true)
    } else {
        cb('Error solo Mp4')
    }

}

//setup template ejs
app.set('view engine', "ejs")


//public folder
app.use(express.static('./public'))

//Setup routes
app.use('/auth', authRoutes)



app.get('/', (req, res) => {
    res.render('home')
})

app.post('/upload', (req, res) => {

    upload(req, res, (err) => {
        if (err) {
            console.log(err)
            res.render('home', {
                msg: err
            })
        } else {
            // // console.log(req.file)
            // res.send('test')
            if (req.file === undefined) {
                res.render('home', {
                    msg: 'Errore seleziona un file mp4'
                })
            } else {
                res.render('home', {
                    msg: "Video uplaoded",
                    file: `uploads/${req.file.filename}`
                })
            }
        }
    })
})

app.listen(5000, () => {
    console.log('app listen on port 5000')
})

module.exports = app