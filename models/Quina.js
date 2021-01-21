const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Quina = new Schema({
    sequencia:{
        type: [Number],
        require: true,
    },
    concurso:{
        type: Number,
        require: true
    },
    dataDoConcurso: {
        type: Date,
        require: true
    },
    dataCriacao:{
        type: Date,
        default: Date.now()
    }
})

mongoose.model("quina", Quina)