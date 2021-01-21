const express = require("express");
const router = express.Router()

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
    
    if(tipoSequencia == 5){
        tratarQuina()
    }else if(tipoSequencia == 6){
        tratarSena()
    }


    function tratarQuina(){
        if(erros.length > 0){
            console.log(erros)
            res.render("admin/cadastrarSequencia", {erros: erros})
        }else{
            //envie os dados para o banco aqui
        }
    }

    function tratarSena(){
    }

})






//---\-------------------------------------------------------------------em produção
router.get("/cadastrados/:parametro", (req,res)=>{
    let obj = {
        sequencia: req.params.parametro
    }

    res.render("admin/sequenciaCadastrada",{obj})
})

router.get("/testeflash",(req, res)=>{
    req.flash("success_msg", "O connect flash ta funcionandoooooo!!!!!!")
    res.redirect("/")
})

module.exports = router;