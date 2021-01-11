const express = require("express");
const router = express.Router()

router.get("/",(req,res)=>{
    res.render("admin/index")
});

router.get("/testeflash",(req, res)=>{
    req.flash("success_msg", "O connect flash ta funcionandoooooo!!!!!!")
    res.redirect("/")
})
module.exports = router