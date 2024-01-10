const fs = require("fs");

class ProductManager {
    constructor(){
        this.products = []
        this.path = "productos.json"
    }
    addProduct (product){
        this.getProducts();
        const {title, description, price, thumbnail, code, stock} = product

        if (!title || !description || !price ||!thumbnail || !code || !stock){
            return console.error("Debe llenar todos los campos")
        }

        const productoIndex = this.products.findIndex (producto => producto.code === code)
        if (productoIndex !== -1){
            return console.error("El Producto ya esta Cargado")
        }

        const id = this.setId();
        this.products.push({id, ...product })

        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products))
            console.log("Datos guardados correctamente")
        } catch (error) {
            console.error("No se pudo Escribir los productos");
        }


    }
    
    getProductById(id){
        const productId = this.products.find(product => product.id == id)
        if (productId){
            console.log({productId})
        } else {
            console.log("Not Found")
        }
    }
    
    getProducts(){
        try {
            const data = fs.readFileSync(this.path, "utf8")
            this.products = JSON.parse(data);
            console.log("Archivo Leido")
        } catch (error) {
            console.error("Error al obtener los Productos", error);
        }
        return this.products
    }

    setId() {
        this.lastId = this.getLastId()
        if (this.lastId === 0) this.lastId = 1
        else this.lastId++
        return this.lastId
    }

    getLastId() {
         if(this.products.length === 0) return 0
         const lastproductId = this.products[this.products.length - 1].id
         return lastproductId
    }

    updateProduct(id, newProduct){
        this.getProducts()
        if (this.products.find((product) => product.id === id ) === undefined) {
            return console.error("No hay producto con ese id");
        }

        const indexProd = this.products.findIndex((prod) => prod.id == id)
        this.products[indexProd] = {id, ...newProduct}

        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products))
            console.log("Se reescribio correctamente")
        } catch (error) {
            console.error("error al reescribir el archivo");
        }
    }

    deleteProduct(id){
        this.getProducts()
        if (this.products.find((product) => product.id === id ) === undefined) {
            return console.error("No hay producto con ese id");
        }

        const indexProd = this.products.findIndex((prod) => prod.id == id)
        this.products.splice(indexProd, 1)

        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products))
            console.log("El archivo fue reescrito correctamente ")
        } catch (error) {
            console.error("error al reescribir el archivo");
        }
    }
}

const productManager = new ProductManager()

// const product1 = {
//     title : "titulo producto 1",
//     description : "descripcion producto 1",
//     price: 2560 ,
//     thumbnail: "Sin imagen",
//     code: "ab23",
//     stock : 250
// }

// const product2 = {
//     title : "titulo producto 2",
//     description : "descripcion producto 2",
//     price: 25600 ,
//     thumbnail: "Sin imagen2",
//     code: "ab232",
//     stock : 2502
// }

// const IAmNewProduct = {
//     title : "Producto Actualizado",
//     description : "actualizacion prodcuto",
//     price: 101010101 ,
//     thumbnail: "Sin imagen actualizada",
//     code: "codigo 1892 actualizado",
//     stock : 1313
// }

// productManager.addProduct(product1)
// productManager.addProduct(product2)
// let misProds = productManager.getProducts()
// console.log(misProds)
// productManager.updateProduct(2, IAmNewProduct)
// let Pk = productManager.getProducts()
// console.log(pk)

// const product3 = {
//         title : "titulo producto 3",
//         description : "descripcion producto 3",
//         price: 1793221970,
//         thumbnail: "Sin imagen3",
//         code: "1a782b31",
//         stock : 2502321312
// }

// productManager.addProduct(product3)
// let misProds = productManager.getProducts()
// console.log(misProds)
// productManager.deleteProduct(2)
// let Rap = productManager.getProducts()
// console.log(Rap)