const express=require("express");
const route=express.Router();
const moduloAuto= require("../controller/autoController.js");


route.get("/autos",moduloAuto.listarTodosLosAutos);
route.get("/autos/:marca",moduloAuto.listarSegunUnaMarca);
route.get("/autos/:marca/:dato?",moduloAuto.listaAutosSegunMarcaYDato);

module.exports=route;