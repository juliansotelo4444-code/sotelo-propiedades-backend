const mongoose = require('mongoose');

// Modelo de usuario — guarda datos de registro y verificación de email
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  // El usuario no puede loguearse hasta que verifique el email
  isVerified: {
    type: Boolean,
    default: false,
  },
  // Token que se manda por email para verificar la cuenta
  verificationToken: {
    type: String,
    default: null,
  },
  verificationTokenExpires: {
    type: Date,
    default: null,
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
