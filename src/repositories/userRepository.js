const User = require('../models/User');

// Toda consulta a la BD de usuarios pasa por acá
const userRepository = {
  async findByEmail(email) {
    return User.findOne({ email });
  },

  async findById(id) {
    // No devolver la contraseña al frontend
    return User.findById(id).select('-password');
  },

  async create(data) {
    const user = new User(data);
    return user.save();
  },

  async findByVerificationToken(token) {
    return User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: new Date() },
    });
  },

  async updateById(id, data) {
    return User.findByIdAndUpdate(id, data, { new: true }).select('-password');
  },
};

module.exports = userRepository;
