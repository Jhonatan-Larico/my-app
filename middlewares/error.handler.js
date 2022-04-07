
/* Tenemos dos middleware uno para logear errores y otro para crear un formato cada ves que se tenga un error en la aplicacion  */


function logErrors(err,req,res,next){
  console.log("logErrors")
  //console.error(err);
  //Esto es util para hacer tracking de los errores en un  solo lugar

  // next() middleware normla
  next(err);// middleware de tipo error
}

// Detecta un error pero crea un formato para devolverlo al cliente
// Recuerda asi no se utilise "next"  se debe poner por que es la forma que detecta que es un middleware del tipo error
function errorHandler(err,req,res,next){
  console.log("errorHandler")
  // En que cambia?
  // Aqui ya no quiero seguir al siguiente middleware, si hay un error quiero que sea el punto final
  res.status(500).json({
    message:err.message,
    stack: err.stack,// para saber donde ocurrio el error
  });

}

function boomErrorHandler(err,req,res,next){
  console.log("boomErrorHandler")
  // como pondemos identificar un error del tipo boom?
  if(err.isBoom){ // si esta propiedad existe es un error del tipo boom
    console.log("BOOMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM")
    const {output} = err;

    res.status(output.statusCode).json(output.payload);
  }
  //si no es del tipo boom ejecute un middleware normal de tipo error, iria hacia el errorHandler
  console.log("NEXTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")
  next(err);

}


module.exports={logErrors,errorHandler,boomErrorHandler };
