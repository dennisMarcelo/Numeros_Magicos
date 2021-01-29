const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Quina");
require("../models/Sena");
const Quina = mongoose.model("quina");
const Sena = mongoose.model("sena");

router.get("/",(req,res)=>{
    res.render("admin/index")
});

router.get("/cadastrarSequencia", (req,res)=>{
    res.render("admin/cadastrarSequencia")
})

router.post("/cadastrarSequencia", (req, res)=>{
    let erros = [];
    let tipoSequencia = req.body.tipoSequencia;
    let sequencia = req.body.sequencia;
    let concurso = req.body.concurso;
    let dataDoConcurso = req.body.dataDoConcurso;
    
    //Tratar erros
    //verifica se tem algum numero repetido no array
    for(let cont = 0; cont < sequencia.length; cont++){
        for(let cont2 = cont+1; cont2 <= sequencia.length; cont2++){
            if(sequencia[cont] == sequencia[cont2]){
                erros.push({texto:"Os numeros não podem se repetir"})
                cont = sequencia.length
                break
            }
        }
    }


    //fim erros
    
    if(erros.length > 0){
        res.render("admin/cadastrarSequencia", {erros: erros})
    }else{
        const novaSequencia = {
            sequencia:sequencia,
            concurso:concurso,
            dataDoConcurso:dataDoConcurso,
        }

        if(tipoSequencia == 5){
            tratarQuina(novaSequencia)
        }else if(tipoSequencia == 6){
            tratarSena(novaSequencia)
        }
    }

    function tratarQuina(novaSequencia){
       new Quina(novaSequencia).save()
        .then(()=>{
            req.flash("success_msg", "Sequencia cadastrada com sucesso!")
            res.redirect("/admin")
        })
        .catch(()=>{
            req.flash("error_msg", "Erro ao salvar a sequencia!")
            res.redirect("/admin")
        })
    }

    function tratarSena(novaSequencia){
       new Sena(novaSequencia).save()
        .then(()=>{
            req.flash("success_msg", "Sequencia cadastrada com sucesso!")
            res.redirect("/admin")
        })
        .catch(()=>{
            req.flash("error_msg", "Erro ao salvar a sequencia!")
            res.redirect("/admin")
        })
    }

})

router.get("/cadastrados/:parametro", (req,res)=>{
    let sequenciaTipo = req.params.parametro;

    if(sequenciaTipo == "quinas"){
        Quina.find().sort({dataCriacao:"desc"}).lean()
            .then((objetos)=> recuperarSequencia(objetos, sequenciaTipo))
            .catch((err)=> erroAoRecuperar(err))

    }else if(sequenciaTipo == "senas"){
        Sena.find().sort({dataCriacao:"desc"}).lean()
            .then((objetos)=>recuperarSequencia(objetos, sequenciaTipo))
            .catch((err)=> erroAoRecuperar(err))
    
    }

    function recuperarSequencia(objetos, sequenciaTipo){ 
        res.render(`admin/${sequenciaTipo}`,{objetos:objetos, sequenciaTipo: sequenciaTipo})
    }
    
    function erroAoRecuperar(err){
        req.flash("error_msg", "Erro ao recuperar sequencia, tipo de erro:" + err)
        res.redirect('/admin')
    }

})

router.get("/editarSequencia/:sequenciaTipo/:id", (req, res)=>{
    let sequenciaTipo = req.params.sequenciaTipo;
    let id = req.params.id

    if(sequenciaTipo == "quina"){
        Quina.findOne({_id: id}).lean()
            .then((obj)=>rederizarPagina(obj))
            .catch()

    }else if(sequenciaTipo == "sena"){
        Sena.findOne({_id: id}).lean()
            .then((obj)=>rederizarPagina(obj))
            .catch()
    }

    function rederizarPagina(obj){
        console.log(obj)
        res.render("admin/editarSequencia",{obj,sequenciaTipo})
    }
})

router.get("/deletarSequencia/:sequenciaTipo/:id",(req, res)=>{
    let sequenciaTipo = req.params.sequenciaTipo;
    let id = req.params.id
})




//---\-------------------------------------------------------------------em produção
router.get("/testeflash",(req, res)=>{
    req.flash("success_msg", "O connect flash ta funcionandoooooo!!!!!!")
    res.redirect("/")
})

module.exports = router;