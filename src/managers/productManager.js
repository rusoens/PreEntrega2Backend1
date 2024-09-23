import { promises as fs } from "fs";

export class ProductManager {
    constructor() {
        this.path = "./src/data/products.json";
        this.products = [];
    }

    addProduct = async (product) => {
        try {
            const products = await this.getProducts();
            if (!product.thumbnail) {
                product.thumbnail = "/img/Sin Imagen.jpg"; // Imagen por defecto
            }
            products.push(product);
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
            return product;
        } catch (error) {
            throw new Error("No se pudo agregar el producto");
        }
    }

    getProducts = async () => {
        try {
            const response = await fs.readFile(this.path, "utf8");
            return JSON.parse(response);
        } catch (error) {
            throw new Error("No se puede recuperar la lista de productos");
        }
    }

    getProductById = async (id) => {
        const products = await this.getProducts();
        return products.find(product => product.id === id);
    }

    updateProduct = async (id, data) => {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);

        if (index !== -1) {
            products[index] = { id, ...data };
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
            return products[index];
        } else {
            throw new Error("Producto no encontrado");
        }
    }

    deleteProduct = async (id) => {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);

        if (index !== -1) {
            products.splice(index, 1);
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        } else {
            throw new Error("Producto no encontrado");
        }
    }
}
