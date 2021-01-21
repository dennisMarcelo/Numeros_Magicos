const express = require('express')
const router = express.Router()

router.get("/cadastrarUsuario", (req, res)=>{
    res.render("usuario/cadastrarUsuario")
})

router.get("/login", (req, res)=>{
    res.render("usuario/login")
})

module.exports = router