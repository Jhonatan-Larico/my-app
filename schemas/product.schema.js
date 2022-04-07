//data transform objet(dto) o schemas = validar la data q envia el cliente

const Joi = require('joi');

//eschema especifico para cada campo, eso nos ayuda a reutilizar mucho mejor y poder empezar a utilizar ese codigo en las actualizaciones y en la creacion

               //tipo de campo(string), validacion(uuid)
const id = Joi.string().uuid();

//validar que formato tienen q tener cada uno de los campos
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

//crear un schema para la creacion
const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image : image.required()

})

//crear un schema para la actualizacion
const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image : image

})

//validacion para un get de un producto
const getProductSchema = Joi.object({
  id : id.required(),

})

module.exports = {createProductSchema,updateProductSchema,getProductSchema }
