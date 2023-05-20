const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser');

const app = express()
const port = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

var data = require('./db.json')

app.get('/', (req, res) => {
    res.send(data)
})