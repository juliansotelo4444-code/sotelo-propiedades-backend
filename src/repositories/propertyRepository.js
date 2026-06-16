const Property = require('../models/Property');

const propertyRepository = {
  // Listar con filtros opcionales — cualquier usuario puede ver propiedades
  async findAll(filters = {}) {
    const query = {};
    if (filters.operationType) query.operationType = filters.operationType;
    if (filters.status) query.status = filters.status;
    if (filters.propertyType) query.propertyType = filters.propertyType;
    if (filters.currency) query.currency = filters.currency;
    if (filters.minPrice) query.price = { ...query.price, $gte: Number(filters.minPrice) };
    if (filters.maxPrice) query.price = { ...query.price, $lte: Number(filters.maxPrice) };
    if (filters.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } },
        { neighborhood: { $regex: filters.search, $options: 'i' } },
        { address: { $regex: filters.search, $options: 'i' } },
      ];
    }

    return Property.find(query)
      .populate('propertyType', 'name')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
  },

  // Solo las propiedades del usuario logueado
  async findAllByUser(userId, filters = {}) {
    const query = { user: userId };
    if (filters.operationType) query.operationType = filters.operationType;
    if (filters.status) query.status = filters.status;
    return Property.find(query)
      .populate('propertyType', 'name')
      .sort({ createdAt: -1 });
  },

  async findById(id) {
    return Property.findById(id)
      .populate('propertyType', 'name')
      .populate('user', 'name email');
  },

  async create(data) {
    const property = new Property(data);
    await property.save();
    return property.populate('propertyType', 'name');
  },

  async updateById(id, userId, data) {
    return Property.findOneAndUpdate(
      { _id: id, user: userId },
      data,
      { new: true, runValidators: true }
    ).populate('propertyType', 'name');
  },

  async deleteById(id, userId) {
    return Property.findOneAndDelete({ _id: id, user: userId });
  },

  async countByStatus() {
    return Property.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
  },
};

module.exports = propertyRepository;
