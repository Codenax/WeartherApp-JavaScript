const mongoose = require('mongoose')
const Schema = mongoose.Schema
const HistorySchama = new Schema({
    icon: String,
    name : String,
    country : String,
    main : String,
    description : String,
    temp : Number,
    pressure : Number,
    humidity : Number,
    timezone: String
})
const History = mongoose.model('History', HistorySchama)
module.exports = History