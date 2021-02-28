const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
require("../models/NumerosFrequentes");
require("../models/Sena");
require("../models/Quina")
const NumerosFrequentes = mongoose.model("modelnumerosfrequentes")
const Senas = mongoose.model("sena")
const Quinas = mongoose.model("quina")

router.get("/t10quina",(req, res)=>{
	NumerosFrequentes.aggregate([{$match:{sorteioNome:"quina"}},  {$project:{_id: 0, __v: 0, ultimaAtualizacao: 0, sorteioNome:0}},  {$unwind:"$numerosFrequentes"},   {$limit: 10}, {$group: {_id:null, topTen:{$push: "$numerosFrequentes"}}}])
	.then((numFrequentes)=>{
		res.render("public/top10quina", {topNumeros: numFrequentes[0].topTen})
	})
	.catch((err)=>{
		req.flash("error_msg", "Erro ao buscar top numeros. Erro: ", err)
		res.redirect("/")
	})
})


router.get("/t10sena", (req, res)=>{
   NumerosFrequentes.aggregate([{$match:{sorteioNome:"sena"}},  {$project:{_id: 0, __v: 0, ultimaAtualizacao: 0, sorteioNome:0}},  {$unwind:"$numerosFrequentes"},   {$limit: 10},  {$group: {_id:null, topTen:{$push: "$numerosFrequentes"}}}])
   .then((numFrequentes)=>{
		res.render("public/top10sena", {topNumeros :numFrequentes[0].topTen})
	})
	.catch((err)=>{
		req.flash("error_msg", "Erro ao buscar top numeros. Erro: ", err)
		res.redirect("/")
	})
})

router.get("/ultimas_quinas", (req, res)=>{
	Quinas.aggregate([{$sort:{dataDoConcurso: -1}},  {$limit: 10},  {$project:{_id:0, dataCriacao: 0, __v: 0 }}])
	.then((ultimos)=>{
		res.render("public/ultimas_quinas", {ultimos: ultimos})
	})
	.catch((err)=>{
		req.flash("error_msg", "Erro inesperado, falha ao buscar ultimos sorteios. ERRO: ",err)
	})
})

router.get("/ultimas_senas", (req, res)=>{
	Senas.aggregate([{$sort:{dataDoConcurso: -1}},  {$limit: 10},  {$project:{_id:0, dataCriacao: 0, __v: 0 }}])
	.then((ultimos)=>{
		res.render("public/ultimas_senas", {ultimos: ultimos})
	})
	.catch((err)=>{
		req.flash("error_msg", "Erro inesperado, falha ao buscar ultimos sorteios. ERRO: ",err)
	})
})

module.exports = router