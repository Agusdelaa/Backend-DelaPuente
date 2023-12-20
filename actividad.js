class ProductManager {
    constructor(){
        this.products = []
    }
    addProduct (title, description, price, thumbnail, code, stock){
        
        if (!title || !description || !price ||!thumbnail || !code || !stock){
            return console.log("Debe llenar todos los campos")
        }

        const productoIndex = this.products.findIndex (producto => producto.code === code)
        if (productoIndex !== -1){
            return console.log("El Producto ya esta Cargado")
        }

        const newProduct = {
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        this.products.push(newProduct)
    }

    getProductById(id){
        const productId = this.products.find(product => product.id == id)
        if (productId){
            console.log(productId)
        } else {
            console.log("Not Found")
        }
    }

    getProducts(){
        console.log(this.products)
    }
}

const productManager = new ProductManager()
productManager.getProducts()
productManager.addProduct("Titulo1","description1",1000, "thumnail1", 1234, 260)
productManager.addProduct("Titulo2","description2",1000, "thumnail2", 1234, 260)
productManager.addProduct("Titulo2","description2",1000, "thumnail2", 12346, 260)
productManager.addProduct("Titulo2","description2",1000, "thumnail2", 12347, 260)
productManager.getProducts()
productManager.getProductById(7)
