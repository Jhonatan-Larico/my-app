const boom = require('@hapi/boom');


function validatorHandler(schema, property){//esquema a validar y  property
  console.log("errorHandler")
    return (req,res,next)=>{ //clousure, creando middleware de forma dinamica
      const data = req[property];// req.body, req.params , req.query

      const {error} = schema.validate(data, {abortEarly:false}); // validar la informacion
      // abortEarly:false--> indicamos que envie todos los errores de una sola vez ya que por defecto "Joi" envia los errores uno por uno
      if(error){
        next(boom.badRequest(error)); //enviando a los middleware de tipo error para q lo procesen
      }
      next();
    }

}

module.exports = validatorHandler;
/**
 - Vamos a configurar un middleware que sea dinamico, no vamos a recibir directamenteel req,res,next sino que quiero recibir el schema a validar y la propiedad, por que al final voy a validar de cada request(ejm body, params, query) sacar del req esa informacion y ai si aplicar un schema
 - vamos a usar las clousures, voy a retornar una funcion que tenga el formato de un middleware, necesitamos contruir middlewares de forma dinamica
 - La informacion dentro de un request puede venir en varios lugares, depende de si es un post,get ejm si es un post la informacion vendria en body, pero si es un get vendria en params  o query
*/
