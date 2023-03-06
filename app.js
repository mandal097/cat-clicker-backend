require('./src/db/dbconn')
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path')
const fs = require('fs');
const routes = require('./src/controllers/controller')

const port = 8000;
const app = express();

app.use(morgan('dev'))
app.use(cors({
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
app.use(express.json({}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api', routes)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'amar.html'))
})





app.listen(port, (req, res) => {
    console.log(`server is running ar port no. ${port}`);
})