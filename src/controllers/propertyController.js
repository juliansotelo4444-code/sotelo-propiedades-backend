const propertyService = require('../services/propertyService');

const propertyController = {
  // GET público — cualquiera ve el listado
  async getAll(req, res, next) {
    try {
      const { operationType, status, propertyType, currency, minPrice, maxPrice, search } = req.query;
      const properties = await propertyService.getAll({
        operationType, status, propertyType, currency, minPrice, maxPrice, search,
      });
      res.json(properties);
    } catch (err) {
      next(err);
    }
  },

  // GET privado — solo las del usuario logueado
  async getMyProperties(req, res, next) {
    try {
      const { operationType, status } = req.query;
      const properties = await propertyService.getAllByUser(req.user.id, { operationType, status });
      res.json(properties);
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const property = await propertyService.getById(req.params.id);
      res.json(property);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const property = await propertyService.create(req.body, req.user.id);
      res.status(201).json(property);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const property = await propertyService.update(req.params.id, req.user.id, req.body);
      res.json(property);
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const result = await propertyService.delete(req.params.id, req.user.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  async getStats(req, res, next) {
    try {
      const stats = await propertyService.getStats();
      res.json(stats);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = propertyController;
