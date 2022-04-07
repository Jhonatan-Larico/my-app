// aqui entra toda la lógica
// Lo importante de los servicios es que no deberia inferir si nos conectamos a una base de datos externa,no le debe importar si usasmos  mongodb, postgres
const faker = require("faker");
const boom = require('@hapi/boom');

class ProductServices{

  constructor(){
    this.products = [];
    this.generate();
  }
async  generate(){
    const limit = 100;
    for(let index = 0; index<limit ;index++){
      this.products.push({
        id: faker.datatype.uuid(),
        name:faker.commerce.productName(),
        price:parseInt( faker.commerce.price(),10),
        image: faker.image.imageUrl(),
        isBLock: faker.datatype.boolean(),
      });
    }

  }

async  create(data){
    const newProduct ={
      id: faker.datatype.uuid(),
      ...data

    }
    this.products.push(newProduct)
    return newProduct;
  }

  find(){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve(this.products);
      },5000);

    })
  }

async  findOne(id){
  //const name = this.getTotal();//simular error para ser capturado por los middleware

  const product=  this.products.find(item => item.id === id);
  if(!product){
    throw boom.notFound('Product not found----A');
    //throw new Error("ERRORES")
  }
  if(product.isBLock){
    throw boom.conflict('Product is block');
  }
  return product;
  }
async  update(id,changes){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){// si no  lo encuentra
      throw boom.notFound('Product not found');
    }
    const product = this.products[index];
    this.products[index]={
      ...product,
      ...changes
    };

    return this.products[index]
  }

async delete(id){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){// si no  lo encuentra
      throw boom.notFound('Product not found');
    }
    this.products.splice(index,1);
    return {id};
  }
}


module.exports = ProductServices;
