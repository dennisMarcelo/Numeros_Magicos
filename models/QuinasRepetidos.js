const mongoose = require('mongoose');
const Schema = mongoose.Schema

const QuinaRepetidos = new Schema({
    type:Number,
    require: true,
})

mongoose.model("quinaRepetidos", QuinaRepetidos)