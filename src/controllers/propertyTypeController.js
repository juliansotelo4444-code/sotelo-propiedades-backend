const propertyTypeService = require('../services/propertyTypeService');

const propertyTypeController = {
  async getAll(req, res, next) {
    try {
      const types = await propertyTypeService.getAll(req.user.id);
      res.json(types);
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const type = await propertyTypeService.getById(req.params.id, req.user.id);
      res.json(type);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const type = await propertyTypeService.create(req.body, req.user.id);
      res.status(201).json(type);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const type = await propertyTypeService.update(req.params.id, req.user.id, req.body);
      res.json(type);
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const result = await propertyTypeService.delete(req.params.id, req.user.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = propertyTypeController;
