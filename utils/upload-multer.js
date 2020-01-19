const multer = require('multer')
const path = require('path')


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
    // limits: {
    //     fileSize: 1000000
    // },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myVideo');

//chekcfile type

function checkFileType(file, cb) {
    //permetti extensions
    const filetypes = /.*mp4/;

    //check extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    //check Mime 
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true)
    } else {
        cb('Error solo Mp4')
    }

}

module.exports = upload