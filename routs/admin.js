const express = require("express");
const router = express.Router()

router.get("/",(req,res)=>{
    res.render("admin/index")
});

router.get("/cadastrarSequencia", (req,res)=>{
    res.render("admin/cadastrarSequencia")
})

router.get("/cadastrarUsuario", (req, res)=>{
    res.render("admin/cadastrarUsuario")
})

router.get("/login", (req, res)=>{
    res.render("admin/login")
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