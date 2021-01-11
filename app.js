const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const admin = require("./routs/admin");
const path  = require("path");
const flash = require("connect-flash");
const session = require("express-session")
//configuração
  //sessão
    app.use(session({
        secret:"numeros_magicos",
        resave:true,
        saveUninitialized:true
    }))
    app.use(flash())
    
  //handlebars
    app.engine("handlebars", exphbs({
        defaultlayout:"main"
    }))
    app.set('view engine', "handlebars");
  
  //midlewares
    app.use((req,res,next)=>{
        res.locals.success_msg = req.flash("success_msg");
        res.locals.error_msg = req.flash("error_msg");
        next();
    }) 

//rotas
    app.get("/", (req, res)=>{
        res.render("index")
    })
    app.use("/admin", admin)

//public
    app.use(express.static(path.join(__dirname,"public"))) //configura para reconhecer os arquivos na pasta public

//outros
    app.listen(8081,()=>{
        console.log("Servidor online")
    }) 