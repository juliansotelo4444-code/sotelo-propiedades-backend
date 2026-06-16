const propertyRepository = require('../repositories/propertyRepository');
const propertyTypeRepository = require('../repositories/propertyTypeRepository');

const propertyService = {
  // Listado público — cualquiera puede ver
  async getAll(filters) {
    return propertyRepository.findAll(filters);
  },

  // Solo las del usuario logueado
  async getAllByUser(userId, filters) {
    return propertyRepository.findAllByUser(userId, filters);
  },

  async getById(id) {
    const property = await propertyRepository.findById(id);
    if (!property) {
      const err = new Error('Propiedad no encontrada');
      err.statusCode = 404;
      throw err;
    }
    return property;
  },

  async create(data, userId) {
    // Validar que el tipo de propiedad exista si se mandó
    if (data.propertyType) {
      const type = await propertyTypeRepository.findById(data.propertyType, userId);
      if (!type) {
        const err = new Error('Tipo de propiedad no encontrado');
        err.statusCode = 404;
        throw err;
      }
    }
    return propertyRepository.create({ ...data, user: userId });
  },

  async update(id, userId, data) {
    if (data.propertyType) {
      const type = await propertyTypeRepository.findById(data.propertyType, userId);
      if (!type) {
        const err = new Error('Tipo de propiedad no encontrado');
        err.statusCode = 404;
        throw err;
      }
    }
    const updated = await propertyRepository.updateById(id, userId, data);
    if (!updated) {
      const err = new Error('Propiedad no encontrada');
      err.statusCode = 404;
      throw err;
    }
    return updated;
  },

  async delete(id, userId) {
    const deleted = await propertyRepository.deleteById(id, userId);
    if (!deleted) {
      const err = new Error('Propiedad no encontrada');
      err.statusCode = 404;
      throw err;
    }
    return { message: 'Propiedad eliminada' };
  },

  async getStats() {
    const counts = await propertyRepository.countByStatus();
    const result = { disponible: 0, reservado: 0, vendido: 0, total: 0 };
    counts.forEach(({ _id, count }) => {
      result[_id] = count;
      result.total += count;
    });
    return result;
  },
};

module.exports = propertyService;
