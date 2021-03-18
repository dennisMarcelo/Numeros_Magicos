const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Usuario = new schema({
    nome:{
        type: String,
        require: true
    },
    email:{
        type:String,
        require:true
    },
    admin:{
        type: Number,
        default:0
    },
    senha:{
        type: String,
        require:true
    }
})

mongoose.model("usuario", Usuario);