const express = require('express')
const CommonRoute = require('./src/routes/CommonRoute')
const PanelRoute = require('./src/routes/PanelRoute')

const bodyParser = require('body-parser')
var app = express()
const serverless = require('serverless-http')
const cors = require('cors')

require('./src/config/config')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
const { isAuth } = require('./src/config/auth'); 
const multer = require("multer");
app.use(multer().any())

app.use('/', CommonRoute)
app.use('/', PanelRoute)

app.get('/', (req, res) => res.send('Working!!!'));



if(process.env.ENVIRONMENT  === "lambda"){
    module.exports.handler = serverless(app)
}else{
app.listen(process.env.Port || 7500, function () {
    console.log('App running on port ' + (process.env.PORT || 7500))
})
};