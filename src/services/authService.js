const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const userRepository = require('../repositories/userRepository');
const { generateToken } = require('../utils/jwt');
const { sendVerificationEmail } = require('../utils/email');

const authService = {
  async register({ name, email, password }) {
    // Verificar si el email ya existe
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      const err = new Error('El email ya está registrado');
      err.statusCode = 409;
      throw err;
    }

    
    const hashedPassword = await bcrypt.hash(password, 12);

   
    const verificationToken = uuidv4();
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const user = await userRepository.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpires,
    });

    // Enviar email de verificación
    await sendVerificationEmail(email, name, verificationToken);

    return { message: 'Registro exitoso. Revisá tu email para activar la cuenta.' };
  },

  async verifyEmail(token) {
    const user = await userRepository.findByVerificationToken(token);
    if (!user) {
      const err = new Error('El token es inválido o ya expiró');
      err.statusCode = 400;
      throw err;
    }

    // Marcar como verificado y limpiar el token
    await userRepository.updateById(user._id, {
      isVerified: true,
      verificationToken: null,
      verificationTokenExpires: null,
    });

    return { message: 'Cuenta verificada correctamente. Ya podés iniciar sesión.' };
  },

  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      const err = new Error('Email o contraseña incorrectos');
      err.statusCode = 401;
      throw err;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      const err = new Error('Email o contraseña incorrectos');
      err.statusCode = 401;
      throw err;
    }

    if (!user.isVerified) {
      const err = new Error('Tenés que verificar tu email antes de ingresar');
      err.statusCode = 403;
      throw err;
    }

    const token = generateToken({ id: user._id, email: user.email });

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  },

  async getProfile(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      const err = new Error('Usuario no encontrado');
      err.statusCode = 404;
      throw err;
    }
    return user;
  },
};

module.exports = authService;
