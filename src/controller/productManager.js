const fs = require("fs");

const Product = require("../model/product.js");

// class Product {
//   constructor(titulo, desc, precio, foto, codigo, unidades) {
//     this.id = Date.now();
//     this.title = titulo;
//     this.description = desc;
//     this.price = precio;
//     this.thumbnail = foto;
//     this.code = codigo;
//     this.stock = unidades;
//   }
// }

class ProductManager {
  fileName = "/prueba.json";
  ruta = "";
  dirName = "";
  constructor(dirName) {
    this.dirName = dirName;
    this.ruta = this.dirName + this.fileName;
    this.crearDirectorio(dirName);
    this.validaExistenciaArchivo();
    this.arrayProductos = JSON.parse(fs.readFileSync(this.ruta, "utf-8"));
  }

  validaExistenciaArchivo = () => {
    if (!fs.existsSync(this.ruta)) fs.writeFileSync(this.ruta, "[]");
  };

  addProduct = async (titulo, desc, precio, foto, codigo, unidades) => {
    try {
      this.validaExistenciaArchivo();
      if (
        this.validaIngresos(titulo, desc, precio, foto, codigo, unidades) == 0
      ) {
        let prod = new Product(titulo, desc, precio, foto, codigo, unidades);
        this.arrayProductos.push(prod);
        console.log(`Se cargo el producto ${codigo}`);
        await fs.promises.writeFile(
          this.ruta,
          JSON.stringify(this.arrayProductos)
        );
      }
    } catch (error) {
      console.error(`ERROR agregando Productos: ${error}`);
    }
  };

  getProducts = async () => {
    try {
      this.validaExistenciaArchivo();
      let arrayP = JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"));
      console.log(arrayP);
    } catch (error) {
      console.error(`ERROR obteniendo Productos: ${error}`);
    }
  };

  getProductById = async (id) => {
    try {
      let prod;
      this.validaExistenciaArchivo();
      let arrayP = JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"));
      for (const obj of arrayP) if (obj.id === id) prod = { ...obj };

      prod == undefined
        ? console.error(`No se encontró el producto con ID: ${id}`)
        : console.log(prod);
    } catch (error) {
      console.error(`ERROR obteniendo Producto por ID: ${error}`);
    }
  };

  updateProductById = async (id, titulo, desc, precio, foto, cod, unid) => {
    try {
      this.validaExistenciaArchivo();
      let arryP = JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"));
      for (const obj of arryP) {
        if (obj.id === id) {
          if (this.validaIngresos(titulo, desc, precio, foto, cod, unid) == 0) {
            obj.title = titulo;
            obj.description = desc;
            obj.price = precio;
            obj.thumbnail = foto;
            obj.code = cod;
            obj.stock = unid;
          }
        }
      }
      await fs.promises.writeFile(this.ruta, JSON.stringify(arryP));
      console.log(`El producto id: ${id} fue actualizado correctamente`);
    } catch (error) {
      console.error(`ERROR actualizando Producto: ${error}`);
    }
  };

  deleteProductoById = async (id) => {
    try {
      this.validaExistenciaArchivo();
      let arryP = JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"));
      let arryNew = new Array();

      for (const obj of arryP) if (obj.id !== id) arryNew.push({ ...obj });

      await fs.promises.writeFile(this.ruta, JSON.stringify(arryNew));
      console.log(`El producto id: ${id} fue actualizado correctamente`);
    } catch (error) {
      console.error(`ERROR borrando Producto por ID: ${error}`);
    }
  };

  getProductByCode = (code) => {
    for (const obj of this.arrayProductos) {
      if (obj.code === code) return obj;
    }
  };

  validaIngresos = (titulo, desc, precio, foto, codigo, unidades) => {
    if (
      titulo == "" ||
      desc == "" ||
      precio == "" ||
      foto == "" ||
      codigo == "" ||
      unidades == "" ||
      (titulo, desc, precio, foto, codigo, unidades == undefined)
    ) {
      console.log("Existen errores en los parámetros de ingreso");
      return 1;
    } else {
      if (this.getProductByCode(codigo) != undefined) {
        console.log(`El código ${codigo} ya existe para otro producto`);
        return 1;
      } else {
        return 0;
      }
    }
  };

  crearDirectorio = async (directorio) => {
    try {
      await fs.promises.mkdir(directorio, { recursive: true });
    } catch (error) {
      console.error(`ERROR al crear directorio: ${error}`);
    }
  };
}

module.exports = ProductManager;
//////// ******************************************////////////////
//////// *************   PRUEBAS ****************////////////////
//////// ******************************************////////////////

// let productos = new ProductManager("./file1");

// productos.getProducts();

// productos.addProduct("Título11", "desc11", 150, "path imagen11", "Cod11", 500);
// productos.addProduct("Título22", "desc22", 150, "path imagen22", "Cod22", 500);
// // COD REPETIDO
// productos.addProduct("Título2", "desc2", 150, "path imagen2", "Cod2", 500);
// // TITULO VACIO
// productos.addProduct("", "descripción2", 150, "path imagen2", "Cod7", 500);
// // SIN TITULO
// productos.addProduct("descripción2", 150, "path imagen2", "Cod8", 500);

// productos.getProducts();

// productos.getProductById(1678177024991);

// productos.updateProductById(
//   1678178066416,
//   "Título34",
//   "desc34",
//   153,
//   "path imagen34",
//   "Cod8",
//   5003
// );

// productos.deleteProductoById(1678178066402);
//
