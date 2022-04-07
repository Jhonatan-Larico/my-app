const express = require("express");
const router = express.Router();

//como el parametro es opcional no va a venir definido en la ruta sino q viene como parametro dentro de request
router.get('/',(req,res)=>{ // creando un endpoint
  const {limit,offset} = req.query; //parametros tipo query
  //como son opcionales debo realizar una validacion
  if(limit && offset){
    res.json({
      limit,
      offset
    })
  }else{
    res.send("No hay parametros");
  }

})

module.exports = router;
