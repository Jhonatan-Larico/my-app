const express = require("express");
const router = express.Router();

//endpoint mas complejo con 2 parametros
router.get('/:categoryId/products/:productId',(req,res)=>{
  const {categoryId,productId } = req.params;//req.params devuelve un objeto
  res.json({
    categoryId,
    productId,
    name:'Productc 2',
    price:2000
  });
})
/**De esta manera capturamos los parametrosq vienen por url y los estamos recogiendo desde nuestro programa y los imprimimos*/
module.exports = router;
