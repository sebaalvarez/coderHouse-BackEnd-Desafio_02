const ProductManager = require("./productManager.js");

/* Se creará una instancia de la clase “ProductManager”
  Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
  */
// test1();

/*
Se llamará al método “addProduct” con los campos:
title: “producto prueba”, || description:”Este es un producto prueba”
price:200, || thumbnail:”Sin imagen” || code:”abc123”, || stock:25
El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
*/
// test2();

/* Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
 */
// test3();

/* Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
 */
// test4(1678223199507);

/* Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
 */
// test5(1678223199507, "Título34", "desc34", 153, "path imagen34", "Cod8", 5003);

/* Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
 */
// test6(1678223199507);

function test1() {
  let productos = new ProductManager("./file1");
  productos.getProducts();
}

function test2() {
  let productos = new ProductManager("./file1");
  productos.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  );
  productos.addProduct("Título2", "desc2", 150, "path imagen2", "Cod2", 500);
  // COD REPETIDO
  productos.addProduct("Título3", "desc3", 150, "path imagen3", "Cod2", 500);
  // TITULO VACIO
  productos.addProduct("", "descripción2", 150, "path imagen2", "Cod7", 500);
  // SIN TITULO
  productos.addProduct("descripción2", 150, "path imagen2", "Cod8", 500);
}

function test3() {
  let productos = new ProductManager("./file1");
  productos.getProducts();
}

function test4(id) {
  let productos = new ProductManager("./file1");
  productos.getProductById(id);
}

function test5(id, tit, desc, price, thumbnail, cod, stock) {
  let productos = new ProductManager("./file1");
  productos.updateProductById(id, tit, desc, price, thumbnail, cod, stock);
}

function test6(id) {
  let productos = new ProductManager("./file1");
  productos.deleteProductoById(id);
}
