const fs=require("fs");
const { resolveMx } = require("dns");
const rutaConcesionarias="./data/concesionarias.json";
const leerRutaConcesionarias=fs.readFileSync(rutaConcesionarias,"utf-8");
const parseLeerRutaConcesionarias=JSON.parse(leerRutaConcesionarias);

const moduloAuto=
{
    //En este sitio vas a tener que listar TODOS los autos de nuestras concesionarias .  
    listarTodosLosAutos:function(req,res)
    {
        let listaConsecionarias=parseLeerRutaConcesionarias;
        
        listaConsecionarias.forEach(function(iterador)
        {
            res.write("\nEn la sucursal de "+iterador.sucursal+ " se pueden apresiar los siguientes autos:\n");
            res.write("-----------------------------------------------------------------------");
            iterador.autos.forEach(function(auto)
            {
                res.write(`
Marca: ${auto.marca}
Modelo: ${auto.modelo}
Anio: ${auto.anio}
Color: ${auto.color}
                `)
            });
        });
        res.end();
    }, 

    /*Esta última ruta se encargará de traernos todos los autos y todos los datos asociados a
este de una marca especifica que el usuario ingrese. A su vez, de forma opcional, el usuario
podrá ingresar un color/año ( estos son los posibles datos de los autos ) específico en la url
para que no solo traiga los autos de la marca/año indicado, si no que tambien del color/año
ingresado.
¿Qué pasa si el usuario ingresa una marca inexistente?
¿Qué pasa si el usuario ingresa una marca existente pero un color que no esté asociado
a ningún auto de esa marca?
¿Qué pasa si el usuario ingresa una marca existente pero un año que no esté asociado
a ningún auto de esa marca?*/
    listaAutosSegunMarcaYDato:function(req,res)
    {
        let paramsMarca=req.params.marca;
        let paramsDato=req.params.dato;
        let listaConcesionarias=parseLeerRutaConcesionarias;
        let listaAutos=[];
        let varBooleana=false;
        let contador=0;

        listaConcesionarias.forEach(function(iterador)
        {
            iterador.autos.forEach(function(auto)
            {
                listaAutos.push(auto);
            });
        });
        
        
        res.write("Autos segun la marca "+ paramsMarca+" y el dato "+ paramsDato+"\n\n");
        for(let auto of listaAutos)  
        {      
            if(req.params.marca==auto.marca&&(req.params.dato==auto.color||req.params.dato==(auto.anio).toString()))
            {
                res.write(`
Marca: ${auto.marca}
Modelo: ${auto.modelo}
Anio: ${auto.anio}
Color: ${auto.color}
                
`);
                        contador++
            
                     varBooleana=true;

            }
    }
    if (varBooleana==false)
    {
        listaAutos.forEach(function(iterador)
        {
            
            if(paramsMarca==iterador.marca&&(paramsDato!=iterador.color&&paramsDato!=iterador.anio&&paramsDato!=undefined))
            {
                res.write(`
Marca: ${iterador.marca}
Modelo: ${iterador.modelo}
El dato ${paramsDato} es invalido!

`);
                    contador++

            }
        });

    }
    res.write(`La cantidad de autos son ${contador}`);
    res.end()

    },


    listarSegunUnaMarca:function(req,res)
    {
        
        let paramMarca=req.params.marca;
        let listaConsecionarias=parseLeerRutaConcesionarias;
        let contador=0;

        
        res.write("\nLos autos segun la marca "+paramMarca+" son:\n");
        listaConsecionarias.forEach(function(iterador)
        {
            iterador.autos.forEach(function(auto)
            {
                if(paramMarca==auto.marca)
                {
                res.write(`

Marca: ${auto.marca}
Modelo: ${auto.modelo}
Anio: ${auto.anio}
color: ${auto.color}
`);
                contador++
                }
            });
        });
        res.write(`La cantidad de autos son ${contador}`)
        res.end();
    },

}
module.exports=moduloAuto;