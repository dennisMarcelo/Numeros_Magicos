const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const admin = require("./routs/admin");
const usuario = require("./routs/usuarios");
const public = require("./routs/public")
const path  = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
require('./config/auth')(passport)
//configuração
  //sessão
    app.use(session({
        secret:"numeros_magicos",
        resave:true,
        saveUninitialized:true
    }))
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash())

  //body-parser
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
  //handlebars
    app.engine("handlebars", exphbs({
        defaultlayout:"main"
    }))
    app.set('view engine', "handlebars");
  
  //midlewares
    app.use((req,res,next)=>{
        res.locals.success_msg = req.flash("success_msg");
        res.locals.error_msg = req.flash("error_msg");
        res.locals.error = req.flash("error");
        next();
    })

  //mongoose
    mongoose.connect("mongodb://localhost/numerosmagicos", {useNewUrlParser: true, useUnifiedTopology:true})
    .then(()=>{
        console.log("Servidor conectado ao Mongo");
    })
    .catch((err)=>{
        console.log("Erro ao conectar-se ao mongo, tipo de erro: "+err);
    })

//rotas
    app.get("/", (req, res)=>{
        res.render("index")
    })
    app.use("/admin", admin)

    app.use("/usuario",usuario)

    app.use("/public", public)

//public
    app.use(express.static(path.join(__dirname,"public"))) //configura para reconhecer os arquivos na pasta public

//outros
    app.listen(8081,()=>{
        console.log("Servidor online")
    }) 