const router = require('express').Router()
const passport = require('passport')
const uploadVideo = require('../config/youTubeApi')


router.get('/login', (req, res) => {

    res.render('login')

})


//auth logOut
router.get('/logout', (req, res) => {
    //gestici con passport
    res.send('logoout')
})


//auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));


//callback redirect

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send('callback uri')
})

router.get('/youtube', passport.authenticate('youtube', {
    scope: ['profile']
}))
router.get('/google/youtube', (req, res) => {
    console.log(req.query)
    res.send('hello world')
})

module.exports = router;