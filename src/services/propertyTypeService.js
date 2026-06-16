const propertyTypeRepository = require('../repositories/propertyTypeRepository');

const propertyTypeService = {
  async getAll(userId) {
    return propertyTypeRepository.findAllByUser(userId);
  },

  async getById(id, userId) {
    const type = await propertyTypeRepository.findById(id, userId);
    if (!type) {
      const err = new Error('Tipo de propiedad no encontrado');
      err.statusCode = 404;
      throw err;
    }
    return type;
  },

  async create({ name }, userId) {
    const exists = await propertyTypeRepository.existsByName(name, userId);
    if (exists) {
      const err = new Error('Ya existe un tipo con ese nombre');
      err.statusCode = 409;
      throw err;
    }
    return propertyTypeRepository.create({ name, user: userId });
  },

  async update(id, userId, { name }) {
    const exists = await propertyTypeRepository.existsByName(name, userId, id);
    if (exists) {
      const err = new Error('Ya existe un tipo con ese nombre');
      err.statusCode = 409;
      throw err;
    }
    const updated = await propertyTypeRepository.updateById(id, userId, { name });
    if (!updated) {
      const err = new Error('Tipo de propiedad no encontrado');
      err.statusCode = 404;
      throw err;
    }
    return updated;
  },

  async delete(id, userId) {
    const deleted = await propertyTypeRepository.deleteById(id, userId);
    if (!deleted) {
      const err = new Error('Tipo de propiedad no encontrado');
      err.statusCode = 404;
      throw err;
    }
    return { message: 'Tipo eliminado' };
  },
};

module.exports = propertyTypeService;
