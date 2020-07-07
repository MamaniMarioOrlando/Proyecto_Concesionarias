const fs=require("fs");
const rutaArchivoConcesionarias="./data/concesionarias.json";
const leerRutaArchivoConcesionarias=fs.readFileSync(rutaArchivoConcesionarias,"utf-8");
const parseLeerRutaArchivoConcesionarias=JSON.parse(leerRutaArchivoConcesionarias);


const homePage=
{

    homePage:function(req,res)
    {
        res.write("Bienvenidos al mejor sitio web de concesionarias de autos\n");
        let contador=0;
        let listaSucursales=parseLeerRutaArchivoConcesionarias;
        res.write("\nSucursales:\n");
        listaSucursales.forEach(element =>
        {
            res.write(++contador+"-"+element.sucursal+"\n");
        });
        res.end();
    },

}

module.exports=homePage;