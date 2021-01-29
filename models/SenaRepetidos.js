const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SenaRepetidos = new Schema({
    type: Number,
    require: true
});

mongoose.model("senaRepetidos", SenaRepetidos);