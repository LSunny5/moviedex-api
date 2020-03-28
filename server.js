require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(morgan('dev'))

app.use(function validateBearerToken(req, res, next) {
    const bearerToken = req.get('Authorization').split(' ')[1]
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')

    //console.log('validate bearer token middleware')

    if (!authToken || authToken.split(' ')[1] !== apiToken) {
        return res.status(401).json({ error: 'Unauthorized request' })
    }
    next()
})



function handleGetMovie(req, res) {
    res.send('Here are the movies!');
}

app.get('/movie', handleGetMovie);













const PORT = 8000

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})
