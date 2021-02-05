const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ModelNumerosFrequentes = new Schema({
   sorteioNome:{
      type: String,
      require: true
   },
   numerosFrequentes:{
      type: [Object],
      require: true
   },
   ultimaAtualizacao:{
      type: Date,
      default: Date.now()
   }
})

mongoose.model("modelnumerosfrequentes", ModelNumerosFrequentes)