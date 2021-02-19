const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
require("../models/NumerosFrequentes")
const NumerosFrequentes = mongoose.model("modelnumerosfrequentes")

router.get("/t10quina",(req, res)=>{
	NumerosFrequentes.aggregate([{$match: {sorteioNome: "quina"}}, {$project: {_id: 0, __v: 0, ultimaAtualizacao: 0}}])
	.then((numFrequentes)=>{
		let topNumeros = []
		for(let cont= 0; cont < 10 ;cont++){                
			topNumeros.push(numFrequentes[0].numerosFrequentes[cont])
		}
		res.render("public/top10quina", {topNumeros:topNumeros})
	})
	.catch((err)=>{
		req.flash("error_msg", "Erro ao buscar top numeros. Erro: ", err)
		res.redirect("/")
	})
})


router.get("/t10sena", (req, res)=>{
   NumerosFrequentes.aggregate([{$match: {sorteioNome:"sena"}}, {$project:{_id: 0, __v: 0, ultimaAtualizacao: 0}}])
   .then((numFrequentes)=>{
		let topNumeros = []
		for(let cont= 0; cont < 10 ;cont++){                
			topNumeros.push(numFrequentes[0].numerosFrequentes[cont])
		}
		res.render("public/top10sena", {topNumeros:topNumeros})
	})
	.catch((err)=>{
		req.flash("error_msg", "Erro ao buscar top numeros. Erro: ", err)
		res.redirect("/")
	})
})

module.exports = router