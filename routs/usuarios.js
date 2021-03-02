const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require("../models/Usuarios");
const Usuario = mongoose.model("usuario");

router.get("/cadastrarUsuario", (req, res) => {
    res.render("usuario/cadastrarUsuario")
})

router.post("/registro", (req, res) => {
    let erros = [];

    if (!req.body.nome || req.body.nome == undefined || req.body.nome == null) {
        erros.push({
            texto: "Nome Inválido!"
        })
    }

    if (!req.body.email || req.body.email == undefined || req.body.email == null) {
        erros.push({
            texto: "Email Inválido!"
        })
    }

    if (!req.body.senha || req.body.senha == undefined || req.body.senha == null) {
        erros.push({
            texto: "Senha Inválida!"
        })
    }

    if (req.body.senha.length < 5) {
        erros.push({
            texto: "Senha Muito Curta!"
        })
    }

    if (req.body.senha != req.body.senhaDeComparacao) {
        erros.push({
            texto: "As Senhas Não batem!"
        })
    }

    if (erros.length > 0) {
        res.render("usuario/cadastrarUsuario", {
            erros: erros
        })
    } else {
        //parei aqui
    }

})

router.get("/login", (req, res) => {
    res.render("usuario/login")
})

module.exports = router