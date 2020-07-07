const express=require("express");
const router=express.Router();
const moduloSucursales=require("../controller/sucursalesController.js")

router.get("/sucursales",moduloSucursales.sucursalesDatos);
router.get("/sucursales/:sucursal",moduloSucursales.SucursalParametrizada);

module.exports=router;