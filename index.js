const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
app.use(cors())

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/api/history', require('./api/route'))

const PORT = process.env.PORT || 4444


app.listen(PORT, () =>{
    console.log("I am runing now in port "+ PORT)
    mongoose.connect("mongodb://jbalam:WsizF22xvR25jGwN@cluster0-shard-00-00.g8wvd.mongodb.net:27017,cluster0-shard-00-01.g8wvd.mongodb.net:27017,cluster0-shard-00-02.g8wvd.mongodb.net:27017/weather_app?ssl=true&replicaSet=atlas-kzn36o-shard-0&authSource=admin&retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
        console.log('Database Connected')
    });

})
