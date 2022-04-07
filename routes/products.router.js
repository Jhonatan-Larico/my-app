const express = require("express");

const ProductServices= require('../services/products')
const validatorHandler = require('../middlewares/validator.handler')
const {createProductSchema,updateProductSchema,getProductSchema} = require('../schemas/product.schema')// este middleware no va a correr de una forma generica como los de error por que al final no podemos tener uno generico para cada uno de estos, cada endpoint debe correr y definir cual es su schema, de donde saco los datos, entonces estos middlewares corren en la ruta


const router = express.Router();
const service = new ProductServices();

/*Aqui solo voy a dejar las partes especializadas no voy a dejar el endpoint
De esta manera separamos las responsabilidades en "productos.js" vamos a encontar todas las rutas que tengan que ver con los productos* /

// endpoint de productos- ejecicio anterior
/* app.get('/products',(req,res)=>{
  // lo que mas vamos a usar es json por q vamos hacer una api
  res.json([
    {
      name:'Produc 1',
      price:1000
    },
    {
      name:'Productc 2',
      price:2000
    }
  ])
}) */

//generando data fake con un tamaño determinado
router.get('/', async (req,res)=>{
  const products = await service.find();
  res.json(products);
});


/*Realizar este endpoint puede traernos problemas porque ya tenias un endpoint de products y /filter lo reconoce como un id ¿Como lo sulucionamos?
Todo lo que es esfecifico debe ir antes de lo q es dinamico
Endpoint especifico*/
router.get('/filter',(req,res)=>{
  res.send("Yo soy un filter");
})
// endpoint para  recibir o devolver el detalle de un producto recibiendo el id
//Endpoint dinamico
router.get('/:id',
  validatorHandler(getProductSchema,'params'), // middleware, si todo esta bien continua, el otro middleware
  async(req,res,next)=>{
    try {
      //todos los parametros q se reciban por get ":id o query" los envia como string
      const {id} = req.params;//req.params devuelve un objeto
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
        next(error)//ejecuta los middleware tipo error
    }
});

router.post('/',
  validatorHandler(createProductSchema,'body'),
  async (req,res)=>{
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
});

//recibo el id del producto que quiero editar
router.patch('/:id',
validatorHandler(getProductSchema,'params'),
validatorHandler(updateProductSchema,'body'),
async (req,res,next)=>{
  try {
    const {id} = req.params;
    const body = req.body;
    const product =await service.update(id,body);
    res.json(product);
  } catch (error) {
    next(error)
  }

});

// solo necesita un id
router.delete('/:id',async (req,res)=>{
  const {id} = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

module.exports = router;
