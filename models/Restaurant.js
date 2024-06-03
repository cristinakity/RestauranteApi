const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Esquema para Órdenes
const ordenSchema = new Schema({
  items: [{ type: Schema.Types.ObjectId, ref: 'ItemMenu' }],
  numeroMesa: { type: Number, required: true },
  esParaLlevar: { type: Boolean, default: false },
  fechaHora: { type: Date, default: Date.now },
});

// Esquema para Elementos del Menú
const itemMenuSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  categoria: { type: String, required: true },
  // Otros campos según sea necesario
});

// Esquema para Reservaciones
const reservaSchema = new Schema({
  nombreCliente: { type: String, required: true },
  fechaHora: { type: Date, required: true },
  numeroDePersonas: { type: Number, required: true },
  // Otros campos según sea necesario
});

// Esquema para Elementos de Inventario
const elementoInventarioSchema = new Schema({
  nombre: { type: String, required: true },
  cantidad: { type: Number, required: true },
  umbral: { type: Number, required: true },
  // Otros campos según sea necesario
});

// Esquema para Facturas
const facturaSchema = new Schema({
  idOrden: { type: Schema.Types.ObjectId, ref: 'Orden' },
  montoTotal: { type: Number, required: true },
  metodoDePago: { type: String, required: true },
  // Otros campos según sea necesario
});

// Esquema para Reportes
const reporteSchema = new Schema({
  titulo: { type: String, required: true },
  contenido: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  // Otros campos según sea necesario
});

// Definir modelos basados en los esquemas
const Orden = mongoose.model('Orden', ordenSchema);
const ItemMenu = mongoose.model('ItemMenu', itemMenuSchema);
const Reserva = mongoose.model('Reserva', reservaSchema);
const ElementoInventario = mongoose.model('ElementoInventario', elementoInventarioSchema);
const Factura = mongoose.model('Factura', facturaSchema);
const Reporte = mongoose.model('Reporte', reporteSchema);

module.exports = { Orden, ItemMenu, Reserva, ElementoInventario, Factura, Reporte };
