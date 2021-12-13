require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser');
const routes = require('./routes')

app.use(bodyParser.json());
app.use(cors({credentials: true, origin: 'http://localhost:8080'}))
app.use(function (req, res, next){
    res.header('Access-Control-Allow-Origin','http://localhost:8080'); 
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS');
    next();
})

app.use(routes)


const port = process.env.PORT
app.listen(port, ()=> console.log(
    `Server started in http://localhost:${port}`
))


