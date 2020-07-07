const express=require("express");
const router=express.Router();
const moduloHomePage=require("../controller/homeController.js");

router.get("/",moduloHomePage.homePage);

module.exports=router;