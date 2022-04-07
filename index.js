const express = require("express");
const cors = require("cors");
//No tengo q colocar index por que se busca en automatico
const routerApi = require("./routes")

const {logErrors,errorHandler,boomErrorHandler} = require('./middlewares/error.handler')

const app = express();
const port = process.env.PORT || 3000;


/**Crear un middlewares
 Se debe crear cuando queremos empezar a recibir informacion en el formato json
*/
app.use(express.json());
// origenes de los cuales si quiero recibir peticiones
const whitelist = ['https://myapp.com',"http://127.0.0.1:5500"]

// para q funcione lo anterior
const options ={
  origin: (origin,callback)=>{
    if(whitelist.includes(origin) || !origin){
      callback(null,true);// (no hay error, acceso permitido)
    }else{
      callback(new Error('no permitido'));

    }
  }
}

// Si lo hacemos de esta manera habilitamos a cualquier dominio, por defecto solo acepta su mismo origen, colocando esta configuracion ahora acepta cualquier origen
app.use(cors(options));
/*Es una buena solucion darle acceso a todos?
  Si es una api publica lo normal es q si
*/

app.get('/',(req,res)=>{
  res.send('Hola mi server en express')
})
app.get('/nueva-ruta',(req,res)=>{
  res.send('Hola soy una nueva ruta o endpoint')
})

routerApi(app);

/* Los middleware de tipo error se deben hacer despues de definir el  routing
Se deve observar en que orden se estan ejecutando */
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);



app.listen(port,()=>{
  console.log('MI port' + port);
})

