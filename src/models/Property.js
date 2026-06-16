const mongoose = require('mongoose');

// Modelo principal de la app — representa una propiedad inmobiliaria
const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 2000,
    default: '',
  },
  // Venta o Alquiler
  operationType: {
    type: String,
    enum: ['venta', 'alquiler'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  // Moneda: pesos argentinos o dólares
  currency: {
    type: String,
    enum: ['ARS', 'USD'],
    default: 'USD',
  },
  address: {
    type: String,
    trim: true,
    maxlength: 200,
    default: '',
  },
  neighborhood: {
    type: String,
    trim: true,
    maxlength: 100,
    default: '',
  },
  surfaceM2: {
    type: Number,
    min: 0,
    default: null,
  },
  rooms: {
    type: Number,
    min: 0,
    default: null,
  },
  // Array de URLs de fotos
  photos: {
    type: [String],
    default: [],
  },
  status: {
    type: String,
    enum: ['disponible', 'reservado', 'vendido'],
    default: 'disponible',
  },
  // Relación con PropertyType (populate)
  propertyType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PropertyType',
    default: null,
  },
  // Quien publicó la propiedad
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
