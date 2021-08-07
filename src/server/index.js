var path = require('path')
const dotenv = require('dotenv');
dotenv.config()
const express = require('express')
const cors = require('cors')
const mockAPIResponse = require('./mockAPI.js')
const makeRequest = require('./makeRequest')

const app = express()

app.use(cors());
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({ extended: false, limit: '20mb' }));

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('evaluate news article with nlp app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/article', makeRequest.getArticle)