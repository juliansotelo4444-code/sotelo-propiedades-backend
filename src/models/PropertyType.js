const mongoose = require('mongoose');

// Tipos de propiedad: Casa, Departamento, Local, etc.
// Es la entidad relacionada con Property
const propertyTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  // Cada tipo pertenece a un usuario (quien lo creó)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

// No puede haber dos tipos iguales para el mismo usuario
propertyTypeSchema.index({ name: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('PropertyType', propertyTypeSchema);
