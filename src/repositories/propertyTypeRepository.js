const PropertyType = require('../models/PropertyType');

const propertyTypeRepository = {
  async findAllByUser(userId) {
    return PropertyType.find({ user: userId }).sort({ name: 1 });
  },

  async findById(id, userId) {
    return PropertyType.findOne({ _id: id, user: userId });
  },

  async create(data) {
    const type = new PropertyType(data);
    return type.save();
  },

  async updateById(id, userId, data) {
    return PropertyType.findOneAndUpdate(
      { _id: id, user: userId },
      data,
      { new: true, runValidators: true }
    );
  },

  async deleteById(id, userId) {
    return PropertyType.findOneAndDelete({ _id: id, user: userId });
  },

  async existsByName(name, userId, excludeId = null) {
    const query = { name: { $regex: new RegExp(`^${name}$`, 'i') }, user: userId };
    if (excludeId) query._id = { $ne: excludeId };
    return PropertyType.exists(query);
  },
};

module.exports = propertyTypeRepository;
