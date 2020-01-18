const router = require('express').Router()
const upload = require('../utils/upload-multer')



router.post('/', (req, res) => {
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

module.exports = router;