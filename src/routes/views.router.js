import express from 'express';
import { Router } from 'express';
import { productManager } from '../app.js';

const router = Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Toy-Toy-Shop',
        buttons: [
            { name: 'Productos', link: '/products' },
            { name: '"Real Time Products"', link: '/realtimeproducts' },
            { name: 'Agregar Productos', link: '/products/add' }
        ]
    });
});

router.get('/products', async (req, res) => {
    try {
        const productos = await productManager.getProducts();
        res.render('products', { productos });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al intentar recibir los productos");
    }
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realtimeproducts');
});

router.get('/products/add', (req, res) => {
    res.render('addProduct');
});

export { router as viewsRouter };
