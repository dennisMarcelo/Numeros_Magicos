const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require("../models/Usuarios");
const Usuario = mongoose.model("usuario");
const bcrypt = require("bcrypt")
const passport = require('passport');

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
        Usuario.findOne({email: req.body.email}).lean()
            .then((usuario) => {
                if(usuario){
                    req.flash("error_msg", "Email já cadastrado, utilize um email diferente.")
                    res.redirect("/usuario/cadastrarUsuario")
                }else{
                    const novoUsuario = new Usuario({
                        nome: req.body.nome,
                        email: req.body.email,
                        senha: req.body.senha
                    })
                    //Criptografar senha
                    bcrypt.genSalt(10, (erro, salt) => {
                        bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                            if(erro){
                                req.flash("error_msg", "Erro ao salvar senha!");
                                res.redirect("/usuario/cadastrarUsuario");
                            }

                            novoUsuario.senha = hash;

                            novoUsuario.save()
                                .then(() => {
                                    req.flash("success_msg", "Senha salva com sucesso!");
                                    res.redirect("/")
                                })
                                .catch((err) => {
                                    req.flash("error_msg", "Houve um erro ao salvar novo usuário.");
                                })
                        });
                    });
                    
                }
            })
            .catch((err) => {
                req.flash("error_msg", "Ouve um erro interno na hora de registrar usuario, tente novamente! ERRO: "+err)
                res.redirect("/usuario/cadastrarUsuario")
            })
    }
})

router.get("/login", (req, res) => {
    res.render("usuario/login")
})

router.post("/validatelogin", (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/usuario/login',
        failureFlash: true,
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'Deslogado com sucesso!');
    res.redirect('/');
})

module.exports = router