const express=require("express");
const route=express.Router();
const moduloMarca=require("../controller/marcasController.js");

route.get("/marcas",moduloMarca.listarTodasLasMarcas);
route.get("/marcas/:marca",moduloMarca.listarMarcaDelParametro);


module.exports=route;