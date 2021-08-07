
const fetch = require('node-fetch')

const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?'
const apiKey = process.env.API_KEY
console.log(`Your API Key is ${process.env.API_KEY}`);
 
const getArticle = async (req, res) => {
    const URL = req.body.url
    const apiURL = `${baseURL}key=${apiKey}&url=${URL}&lang=en`
    const response = await fetch(apiURL)
    const mcData = await response.json()

    res.status(200).send(mcData)

}

exports.getArticle = getArticle;