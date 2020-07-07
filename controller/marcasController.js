const fs=require("fs");
const { resolveSoa } = require("dns");
const rutaSucursales="./data/concesionarias.json";
const leerRutaSucursales=fs.readFileSync(rutaSucursales,"utf-8");
const parseLeerRutaSucursales=JSON.parse(leerRutaSucursales);

const moduloMarca=
{
    /*En esta sección te pedimos que listes todas las marcas de los autos que se encuentran en
nuestras concesionarias. Ojo, que las marcas pueden repetirse ya que existen distintos
autos con la misma marca, pero sólo queremos que la marca aparezcan una vez sola vez.*/
    listarTodasLasMarcas:function(req,res)
    {
        let listaMarcaDeAutos=[];
        let listaSucursales=parseLeerRutaSucursales;
        let contador=0;

        listaSucursales.forEach(function(iterador)
        {
            iterador.autos.forEach(function(auto)
            {
                listaMarcaDeAutos.push(auto.marca);
            });
        });
        
        let listaDeMarcasSinRepeticiones=[...new Set(listaMarcaDeAutos)];
        let listaOrdenada=listaDeMarcasSinRepeticiones.sort();
        
        res.write("\nMarcas de autos son: \n");
        listaOrdenada.forEach(function(iterador)
        {
            res.write("\n"+ ++contador+"-"+iterador+"\n");
        });
        res.end();
    },
    /*Acá vas a tener que listar todos los autos que le pertenezcan a la marca particular que el
usuario está ingresando por la url. Por cada auto deberás aclarar, además de la marca, el
modelo y el año.*/
    listarMarcaDelParametro:function(req,res)
    {
        let paramMarca=req.params.marca;
        let listaConsecionaria=parseLeerRutaSucursales;
        res.write("\nlos autos con la marca ingresada son:\n")
        listaConsecionaria.forEach(function(iterador)
        {
            iterador.autos.forEach(function(auto)
            {
                if(auto.marca==paramMarca)
                {
                    res.write(`
Marca: ${auto.marca}
Modelo: ${auto.modelo}
Anio: ${auto.anio}
                    `)
                }
            });
        });
        res.end();
    },
}
module.exports=moduloMarca