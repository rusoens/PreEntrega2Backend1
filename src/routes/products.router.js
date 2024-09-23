import { Router } from "express";
import { productManager } from "../app.js";
import { promises as fs } from "fs";

const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts();

        if (limit) {
            const limitedProducts = products.slice(0, limit);
            return res.json(limitedProducts);
        } else {
            return res.json(products);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al intentar recibir los productos");
    }
});

productsRouter.get("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductById(pid);
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).send(`Error al intentar recibir el producto con el id: ${pid}`);
    }
});

productsRouter.post("/", async (req, res) => {
    try {
        const { id, title, description, category, price, thumbnail, code, stock } = req.body;
        if ( !id || !title || !description || !category || !price || !code || !stock ) {
            return res.status(400).send("Faltan datos en la solicitud");
        }

        const newProduct = {
            id,
            title,
            description,
            category,
            price,
            thumbnail,
            code,
            stock
        };

        const response = await productManager.addProduct(newProduct);
        res.status(201).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al intentar agregar producto");
    }
});

productsRouter.put("/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
        const { id, title, description, category, price, thumbnail, code, stock } = req.body;
        if ( !id || !title || !description || !category || !price || !code || !stock ) {
            return res.status(400).send("Faltan datos en la solicitud");
        }

        const response = await productManager.updateProduct(pid, { id, title, description, category, price, thumbnail, code, stock });
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).send(`Error al intentar editar producto con id ${pid}`);
    }
});

productsRouter.delete("/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
        await productManager.deleteProduct(pid);
        res.send("Producto Eliminado");
    } catch (error) {
        console.log(error);
        res.status(500).send(`Error al intentar eliminar el producto con id: ${pid}`);
    }
});

// Nueva ruta para importar productos desde stock.json
productsRouter.post("/import-stock", async (req, res) => {
    try {
        const stockData = await fs.readFile('./src/data/stock.json', 'utf8');
        const stockProducts = JSON.parse(stockData);

        for (const product of stockProducts) {
            // No asignar una imagen por defecto si ya hay una imagen
            await productManager.addProduct(product);
        }

        const products = await productManager.getProducts();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al intentar importar el stock");
    }
});

export { productsRouter };
