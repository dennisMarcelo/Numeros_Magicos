const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Quina");
require("../models/Sena");
const Quina = mongoose.model("quina");
const Sena = mongoose.model("sena");
const organizadorDeNumeros = require("../functions/organizadorDeNumeros"); 

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
            tratarQuina(novaSequencia, "quina")
        }else if(tipoSequencia == 6){
            tratarSena(novaSequencia, "sena")
        }
    }

    function tratarQuina(novaSequencia, tipoSequiencia){
       new Quina(novaSequencia).save()
        .then(()=>{
            Quina.aggregate([{$unwind: "$sequencia"},{$group: {_id: null, sequencia:{$push: "$sequencia"}} },{$project:{_id:0, sequencia: "$sequencia"}}])
                .then((todasQuinas)=>{
                    //Organiza os numeros que vem do banco e deposi salva dentro da collection NumerosFrequentes!!!
                    organizadorDeNumeros(todasQuinas[0].sequencia, tipoSequiencia)
                })
                .catch((err)=>{
                    console.log("erro ",err)
                })

            req.flash("success_msg", "Sequencia cadastrada com sucesso!")
            res.redirect("/admin")
        })
        .catch((err)=>{
            req.flash("error_msg", "Erro ao salvar a sequencia! Erro: "+ err)
            res.redirect("/admin")
        })
    }

    function tratarSena(novaSequencia, tipoSequiencia){
       new Sena(novaSequencia).save()
        .then(()=>{
            Sena.aggregate([{$unwind: "$sequencia"},{$group: {_id: null, sequencia:{$push: "$sequencia"}} },{$project:{_id:0, sequencia: "$sequencia"}}])
                .then((todasSenas)=>{
                    //Organiza os numeros que vem do banco e deposi salva dentro da collection NumerosFrequentes!!!
                    organizadorDeNumeros(todasSenas[0].sequencia, tipoSequiencia)
                })
                .catch((err)=>{
                    console.log("erro ",err)
                })     
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
        res.render("admin/editarSequencia",{obj,sequenciaTipo})
    }
})

router.post("/sequenciaEditada", (req, res)=>{
    let tipoSequencia = req.body.tipoSequencia;
    let id = req.body.id;
    let sequencia = req.body.sequencia;
    let concurso = req.body.concurso;
    let dataDoConcurso = req.body.dataDoConcurso;


    if(tipoSequencia == "quina"){
        Quina.findOne({_id:id})
            .then((quina)=>{
                quina.sequencia = sequencia;
                quina.concurso = concurso;
                quina.dataDoConcurso = dataDoConcurso;

                quina.save()
                    .then(()=>{
                        req.flash("success_msg","Sorteio modificado com sucesso!")
                        res.redirect("/admin/cadastrados/quinas")
                    })
                    .catch((err)=>{
                        req.flash("error_msg","Não foi possivel modificar os dados do sorteio selecionado! tipo de erro: ",err)
                        res.redirect("/admin/cadastrados/quinas")
                    })
            })
            .catch((err)=>{
                req.flash("error_msg","Não foi possivel encotrar o sorteio para modificalo! tipo de erro: ",err)
                res.redirect("/admin/cadastrados/quinas")
            })

    }else if(tipoSequencia == "sena"){
        Sena.findOne({_id:id})
            .then((sena)=>{
                sena.sequencia = sequencia;
                sena.concurso = concurso;
                sena.dataDoConcurso = dataDoConcurso;
                
                sena.save()
                    .then(()=>{
                        req.flash("success_msg","Sorteio modificado com sucesso!")
                        res.redirect("/admin/cadastrados/senas")
                    })
                    .catch((err)=>{
                        req.flash("error_msg","Não foi possivel modificar os dados do sorteio selecionado! tipo de erro: ",err)
                        res.redirect("/admin/cadastrados/senas")
                    })
            })
            .catch((err)=>{
                req.flash("error_msg","Não foi possivel encotrar o sorteio para modificalo! tipo de erro: ",err)
                res.redirect("/admin/cadastrados/senas")
            })
    }

})


router.get("/deletarSequencia/:sequenciaTipo/:id",(req, res)=>{
    let sequenciaTipo = req.params.sequenciaTipo;
    let id = req.params.id

    if(sequenciaTipo == "quina"){
        Quina.deleteOne({_id:id})
            .then(()=>{
                req.flash("success_msg","Sorteio removido com sucesso")
                res.redirect("/admin/cadastrados/quinas")
            })
            .catch((err)=>{
                req.flash("error_msg","Não foi possivel remover o sorteio selecionado! Erro: ", err)
                res.redirect("/admin/cadastrados/quinas")
            })
    }else if(sequenciaTipo == "sena"){
        Sena.deleteOne({_id:id})
            .then(()=>{
                req.flash("success_msg","Sorteio removido com sucesso")
                res.redirect("/admin/cadastrados/senas")
            })
            .catch((err)=>{
                req.flash("error_msg","Não foi possivel remover o sorteio selecionado! Erro:",err)
                res.redirect("/admin/cadastrados/senas")
            })
    }

})




//---\-------------------------------------------------------------------em produção

module.exports = router;