//----Archivo que va configurar todas las rutas---

const express = require('express')

//importar routers
const productsRouter = require('./products');
const usersRouter = require("./users")
const categoriesRouter = require("./categories")

/* function routerApi(app){ Sin versionar API
  //genero una ruta por cada uno de los routers
  app.use('/products',productsRouter);
  //app.use('/users',usersRouter);
  //app.use('/categories',productsRouter);
} */

function routerApi(app){// versionar API
  /*Creamos una ruta maestra del cual todos partan*/
    const router = express.Router()
    app.use("/api/v1", router)// path global para todos los ednpoints de aqui para abajo

  router.use('/products',productsRouter);
  router.use('/users',usersRouter);
  router.use('/categories',categoriesRouter);
    //si quiero realizar otra version repito todo el codigo anterior
  }

module.exports =routerApi;
