const mongoose = require('mongoose');
const Usuario = require('../models/Usuario');
const { Orden, ItemMenu, Reserva, ElementoInventario, Factura, Reporte } = require('../models/Restaurant');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/resturante')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));


module.exports = function (app) {
    // Simple route
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    // CRUD Usuarios

    app.get('/usuarios', async (req, res) => {
        try {
            const usuarios = await Usuario.find();
            res.json(usuarios);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Error de servidor' });
        }
    });

    // Route to get a usuario by ID
    app.get('/usuarios/:id', async (req, res) => {
        try {
            const usuarioId = req.params.id;

            // Find the usuario by ID
            const usuario = await Usuario.findById(usuarioId);

            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            res.json(usuario);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Error de servidor' });
        }
    });

    app.post('/usuarios', async (req, res) => {
        console.log(req.body);
        const usuario = new Usuario(req.body);
        try {
            await usuario.save();
            res.status(201).send(usuario);
        } catch (error) {
            res.status(400).send(error);
        }
    });

    // update a usuario
    app.put('/usuarios/:id', async (req, res) => {
        try {
            const usuarioId = req.params.id;
            const { nombre, email } = req.body;

            // Busca al usuario por id
            const usuarioActualizado = await Usuario.findByIdAndUpdate(usuarioId, { nombre, email }, { new: true });

            if (!usuarioActualizado) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            res.json(usuarioActualizado);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Error de servidor' });
        }
    });

    app.delete('/usuarios/:id', async (req, res) => {
        try {
            const usuario = await Usuario.findByIdAndDelete(req.params.id);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrada' });
            }
            res.json({ message: 'Usuario eliminada exitosamente' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // CRUD operations for Orden (Order)
    app.post('/ordenes', async (req, res) => {
        try {
            const orden = await Orden.create(req.body);
            res.status(201).json(orden);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    app.get('/ordenes', async (req, res) => {
        try {
            const ordenes = await Orden.find();
            res.json(ordenes);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    app.get('/ordenes/:id', async (req, res) => {
        try {
            const orden = await Orden.findById(req.params.id);
            if (!orden) {
                return res.status(404).json({ message: 'Orden no encontrada' });
            }
            res.json(orden);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    app.put('/ordenes/:id', async (req, res) => {
        try {
            const orden = await Orden.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!orden) {
                return res.status(404).json({ message: 'Orden no encontrada' });
            }
            res.json(orden);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    app.delete('/ordenes/:id', async (req, res) => {
        try {
            const orden = await Orden.findByIdAndDelete(req.params.id);
            if (!orden) {
                return res.status(404).json({ message: 'Orden no encontrada' });
            }
            res.json({ message: 'Orden eliminada exitosamente' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // CRUD operations for ItemMenu
    app.post('/items-menu', async (req, res) => {
        try {
            const itemMenu = await ItemMenu.create(req.body);
            res.status(201).json(itemMenu);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    app.get('/items-menu', async (req, res) => {
        try {
            const itemsMenu = await ItemMenu.find();
            res.json(itemsMenu);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    app.get('/items-menu/:id', async (req, res) => {
        try {
            const itemMenu = await ItemMenu.findById(req.params.id);
            if (!itemMenu) {
                return res.status(404).json({ message: 'Elemento de Menú no encontrado' });
            }
            res.json(itemMenu);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    app.put('/items-menu/:id', async (req, res) => {
        try {
            const itemMenu = await ItemMenu.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!itemMenu) {
                return res.status(404).json({ message: 'Elemento de Menú no encontrado' });
            }
            res.json(itemMenu);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    app.delete('/items-menu/:id', async (req, res) => {
        try {
            const itemMenu = await ItemMenu.findByIdAndDelete(req.params.id);
            if (!itemMenu) {
                return res.status(404).json({ message: 'Elemento de Menú no encontrado' });
            }
            res.json({ message: 'Elemento de Menú eliminado exitosamente' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // CRUD operations for Reserva
    app.post('/reservas', async (req, res) => {
        try {
            const reserva = await Reserva.create(req.body);
            res.status(201).json(reserva);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    app.get('/reservas', async (req, res) => {
        try {
            const reservas = await Reserva.find();
            res.json(reservas);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    app.get('/reservas/:id', async (req, res) => {
        try {
            const reserva = await Reserva.findById(req.params.id);
            if (!reserva) {
                return res.status(404).json({ message: 'Reserva no encontrada' });
            }
            res.json(reserva);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    app.put('/reservas/:id', async (req, res) => {
        try {
            const reserva = await Reserva.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!reserva) {
                return res.status(404).json({ message: 'Reserva no encontrada' });
            }
            res.json(reserva);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    app.delete('/reservas/:id', async (req, res) => {
        try {
            const reserva = await Reserva.findByIdAndDelete(req.params.id);
            if (!reserva) {
                return res.status(404).json({ message: 'Reserva no encontrada' });
            }
            res.json({ message: 'Reserva eliminada exitosamente' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // CRUD operations for ElementoInventario
    app.post('/elementos-inventario', async (req, res) => {
        try {
            const elementoInventario = await ElementoInventario.create(req.body);
            res.status(201).json(elementoInventario);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    app.get('/elementos-inventario', async (req, res) => {
        try {
            const elementosInventario = await ElementoInventario.find();
            res.json(elementosInventario);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    app.get('/elementos-inventario/:id', async (req, res) => {
        try {
            const elementoInventario = await ElementoInventario.findById(req.params.id);
            if (!elementoInventario) {
                return res.status(404).json({ message: 'Elemento de Inventario no encontrado' });
            }
            res.json(elementoInventario);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    app.put('/elementos-inventario/:id', async (req, res) => {
        try {
            const elementoInventario = await ElementoInventario.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!elementoInventario) {
                return res.status(404).json({ message: 'Elemento de Inventario no encontrado' });
            }
            res.json(elementoInventario);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    app.delete('/elementos-inventario/:id', async (req, res) => {
        try {
            const elementoInventario = await ElementoInventario.findByIdAndDelete(req.params.id);
            if (!elementoInventario) {
                return res.status(404).json({ message: 'Elemento de Inventario no encontrado' });
            }
            res.json({ message: 'Elemento de Inventario eliminado exitosamente' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // CRUD operations for Factura
    app.post('/facturas', async (req, res) => {
        try {
            const factura = await Factura.create(req.body);
            res.status(201).json(factura);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    app.get('/facturas', async (req, res) => {
        try {
            const facturas = await Factura.find();
            res.json(facturas);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    app.get('/facturas/:id', async (req, res) => {
        try {
            const factura = await Factura.findById(req.params.id);
            if (!factura) {
                return res.status(404).json({ message: 'Factura no encontrada' });
            }
            res.json(factura);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    app.put('/facturas/:id', async (req, res) => {
        try {
            const factura = await Factura.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!factura) {
                return res.status(404).json({ message: 'Factura no encontrada' });
            }
            res.json(factura);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    app.delete('/facturas/:id', async (req, res) => {
        try {
            const factura = await Factura.findByIdAndDelete(req.params.id);
            if (!factura) {
                return res.status(404).json({ message: 'Factura no encontrada' });
            }
            res.json({ message: 'Factura eliminada exitosamente' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // CRUD operations for Reporte
    // CRUD operations for Reporte
    app.post('/reportes', async (req, res) => {
        try {
            const reporte = await Reporte.create(req.body);
            res.status(201).json(reporte);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    app.get('/reportes', async (req, res) => {
        try {
            const reportes = await Reporte.find();
            res.json(reportes);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    app.get('/reportes/:id', async (req, res) => {
        try {
            const reporte = await Reporte.findById(req.params.id);
            if (!reporte) {
                return res.status(404).json({ message: 'Reporte no encontrado' });
            }
            res.json(reporte);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    app.put('/reportes/:id', async (req, res) => {
        try {
            const reporte = await Reporte.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!reporte) {
                return res.status(404).json({ message: 'Reporte no encontrado' });
            }
            res.json(reporte);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    app.delete('/reportes/:id', async (req, res) => {
        try {
            const reporte = await Reporte.findByIdAndDelete(req.params.id);
            if (!reporte) {
                return res.status(404).json({ message: 'Reporte no encontrado' });
            }
            res.json({ message: 'Reporte eliminado exitosamente' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });
}