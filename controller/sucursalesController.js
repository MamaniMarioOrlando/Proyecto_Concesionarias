const fs=require("fs");
const rutaArchivoConcesionarias="./data/concesionarias.json";
const leerRutaArchivoConcesionarias=fs.readFileSync(rutaArchivoConcesionarias,"utf-8");
const parseLeerRutaArchivoConcesionarias=JSON.parse(leerRutaArchivoConcesionarias);

const moduloSucursales=
{

    sucursalesDatos:function(req,res)
    {
        res.write("\nDatos de las sucursales:\n");
        let listaSucursales=parseLeerRutaArchivoConcesionarias;
        listaSucursales.forEach(function(iterador)
        {
            res.write(`

Sucursal: ${iterador.sucursal}
Direccion: ${iterador.direccion}
Telefono: ${iterador.telefono}
            `);
        });
        res.end();
    },
    /*En este caso vas a tener mostrar toda la información de la sucursal que el usuario ingrese
en la url ( ¡ recordá que es una ruta parametrizada!). Esto incluye el nombre de la sucursal,
dirección, teléfono y todos los vehículos (marca, modelo, año y cantidad total de autos)
que están en la misma. Recordá que si la sucursal no existe deberás mostrarle al usuario un
mensaje de error.*/
    SucursalParametrizada:function(req,res)
    {
        let parametro=req.params.sucursal;
        let listaSucursales=parseLeerRutaArchivoConcesionarias;

        listaSucursales.forEach(function(iterador)
        {
            if(iterador.sucursal==parametro)
            {
                res.write(`
Sucursal: ${iterador.sucursal}
Direccion: ${iterador.direccion}
Telefono: ${iterador.telefono}
                `);
                res.write("\nListado de todos los vehiculos de la sucursal de "+iterador.sucursal+" son:\n");
                iterador.autos.forEach(function(auto)
                {
                    res.write(`
Marca: ${auto.marca}
Modelo: ${auto.modelo}
Año: ${auto.anio}
Color: ${auto.color}
                    `);
                });
              res.end();
            }
        });
        res.end("Error la sucursal no existe!")

    },

}

module.exports=moduloSucursales;