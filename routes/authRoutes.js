const router = require('express').Router()
const path = require('path')
const CREDENTIALS = readJson(path.join(`${__dirname}/../config/credentials.json`));
const video = path.join(__dirname, "../public/videos")

// Authenticate
// You can access the Youtube resources via OAuth2 only.
// https://developers.google.com/youtube/v3/guides/moving_to_oauth#service_accounts
let oauth = Youtube.authenticate({
    type: "oauth",
    client_id: CREDENTIALS.web.client_id,
    client_secret: CREDENTIALS.web.client_secret,
    redirect_url: CREDENTIALS.web.redirect_uris[0]
});



async function wait(req, res, ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
    });
}

router.get('/google/youtube', (req, res) => {
    try {
        let title = req.flash("title")
        let description = req.flash('description')

        Logger.log("Trying to get the token using the following code: " + req.query.code);


        fs.readdir(video, (err, files) => {
            let newVideo = ""

            if (err) console.log(err)
            files.forEach(file => {
                newVideo = file
            });

            oauth.getToken(req.query.code, (err, tokens) => {

                if (err) {
                    res.send(err, 400);
                    return Logger.log(err);
                }
                __dirname

                Logger.log("Got the tokens.");

                oauth.setCredentials(tokens);

                var req = Youtube.videos.insert({
                    resource: {
                        // Video title and description
                        snippet: {
                            title: title,
                            description: description
                        }
                        // I don't want to spam my subscribers
                        ,
                        status: {
                            privacyStatus: "private"
                        }
                    },
                    // This is for the callback function
                    part: "snippet,status",
                    // Create the readable stream to upload the video                  
                    media: {
                        body: fs.createReadStream(path.join(video, newVideo))
                    }
                }, (err, data) => {
                    // if (err) throw err

                    console.log(err)
                    if (data) {
                        data.fileName = newVideo;
                        console.log("Done.", data);
                    }
                    fs.unlinkSync(path.join(video, newVideo));
                    // process.exit();
                });

                // setInterval(function() {
                //     Logger.log(`${prettyBytes(req.req.connection._bytesDispatched)} bytes uploaded.`);
                // }, 250);
            });

        });

    } catch (error) {
        console.error("Oh no! There was an error!\nSee message below:");
        console.error(error);

        console.log('errore:  ', error)
    }

    res.redirect('/')

})

module.exports = router