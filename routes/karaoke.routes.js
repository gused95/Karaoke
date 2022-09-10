//1 Importamos Express
const express = require("express");
//2 Inicializamos el router
const router = express.Router();



router.get("/", (req,res) =>{
    res.render("karaoke/show")
})





module.exports = router;