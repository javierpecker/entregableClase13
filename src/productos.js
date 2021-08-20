class Producto {
    constructor() {
      this.productos = [];
    }

    readbyid(id) {
      return this.productos.find((producto) => producto.id == id);
    }

    update(dato, id){
      if (
        !dato.title ||
        !dato.price ||
        !dato.thumbnail ||
        typeof dato.title != 'string' ||
        //utilizar raw desde postman para insertar datos con price 'numbre'. Sino arroja error.
        //typeof dato.price != 'number' ||
        typeof dato.thumbnail != 'string'
      ) {
        return 'error'
      };
      if (id < 1 || id > this.productos.length) {
        return 'outOfRange'
      }
      const indice = this.productos.findIndex(data => data.id ==  id);
      dato['id'] = id;
      const dato2 = { 
        id: id,
        title: dato.title,
        price: parseInt(dato.price),
        thumbnail: dato.thumbnail,
      };
      //console.log(this.productos[indice])
      this.productos[indice] = dato2;
      return this.productos
    }
    
    savedata(dato) {
      if (
        !dato.title ||
        !dato.price ||
        !dato.thumbnail ||
        typeof dato.title != 'string' ||
        //utilizar raw desde postman para insertar datos con price 'numbre'. Sino arroja error.
        //typeof dato.price != 'number' ||
        typeof dato.thumbnail != 'string'
      ) {
        return 'error'
      };
      const producto = { 
        id: this.productos.length +1,
        title: dato.title,
        price: parseInt(dato.price),
        thumbnail: dato.thumbnail,
         };
      this.productos.push(producto)
      return producto;
    }

    readlist() {
      return this.productos;
    }

    borrar(id) {
      const indice = this.productos.findIndex(data => data.id ==  id);
      if (id < 1 || id > this.productos.length) {
        return 'outOfRange'
      }
      console.log(indice)
      this.productos.splice(indice, 1);
      return this.productos
    }
  }
  
  export default Producto;