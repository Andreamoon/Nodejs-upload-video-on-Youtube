const router = require('express').Router()
upload = require('../utils/upload-multer')
Youtube = require("youtube-api"),
    fs = require("fs"),
    readJson = require("r-json"),
    Logger = require("bug-killer"),
    opn = require("opn"),
    prettyBytes = require("pretty-bytes");
path = require('path');

const CREDENTIALS = readJson(path.join(`${__dirname}/../config/credentials.json`));


// Authenticate
// You can access the Youtube resources via OAuth2 only.
// https://developers.google.com/youtube/v3/guides/moving_to_oauth#service_accounts
let oauth = Youtube.authenticate({
    type: "oauth",
    client_id: CREDENTIALS.web.client_id,
    client_secret: CREDENTIALS.web.client_secret,
    redirect_url: CREDENTIALS.web.redirect_uris[0]
});





router.post('/', (req, res) => {

    upload(req, res, (err) => {
        if (err) {
            console.log(err)
            res.render('home', {
                msg: err
            })
        } else {

            if (req.file === undefined) {
                res.render('home', {
                    msg: 'Errore seleziona un file mp4'
                })
            } else {
                let youtubeUrlAuth = oauth.generateAuthUrl({
                    access_type: "offline",
                    scope: ["https://www.googleapis.com/auth/youtube.upload"]
                });
                const {
                    title,
                    description
                } = req.body;
                req.flash('title', title);
                req.flash('description', description);


                res.redirect(youtubeUrlAuth);
            }
        }
    })
})

module.exports = router;