
// Encender el servidor
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API de la Cafetería del CRUI funcionando');
});

const productos = [
    { id: 1, nombre: 'Café con leche', precio: 1800, categoria: 'bebida' },
    { id: 2, nombre: 'Medialuna', precio: 900, categoria: 'comida' },
    { id: 3, nombre: 'Tostado de jamón y queso', precio: 3500, categoria: 'comida' },
    { id: 4, nombre: 'Agua mineral', precio: 1200, categoria: 'bebida' }
];

// Listar los productos
app.get('/api/productos', (req, res) => {
    res.json(productos);
});

// Buscar un producto por id
app.get('/api/productos/:id', (req, res) => {
    const id = Number(req.params.id);
    const producto = productos.find(l => l.id === id);

    if (!producto) {
        return res.status(404).json({ error: 'No encontrado' });
    }

    res.json(producto);
});

// Agregar un producto
app.post('/api/productos', (req, res) => {
    const { nombre, precio, categoria } = req.body || {};

    if (!nombre || !precio || !categoria) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    const nuevo = {
        id: productos.length + 1,
        nombre,
        precio,
        categoria
    };

    productos.push(nuevo);
    res.status(201).json(nuevo);
});

// Modificar un producto
app.put('/api/productos/:id', (req, res) => {
    const id = Number(req.params.id);
    const producto = productos.find(p => p.id === id);

    if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    Object.assign(producto, req.body);
    res.json(producto);
});

// Encender el servidor
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
