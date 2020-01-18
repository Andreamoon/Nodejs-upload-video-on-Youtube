const express = require('express');
const app = express();
const router = require('./routes/upload-route')



//setup template ejs
app.set('view engine', "ejs")

app.use('/upload', router)

//public folder
app.use(express.static('./public'))


app.get('/', (req, res) => {
    res.render('home')
})



app.listen(5000, () => {
    console.log('app listen on port 5000')
})