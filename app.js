const express=require("express");
const routeHome=require("./routes/routeHome.js");
const routeSucursales=require("./routes/routeSucursales.js");
const routeMarcas=require("./routes/routeMarcas");
const routeAuto=require("./routes/routeAutos.js");
const app=express();

app.use(routeHome);
app.use(routeSucursales);
app.use(routeMarcas);
app.use(routeAuto);


app.listen(3000,()=>console.log("se levanto el servidor 3030"));
