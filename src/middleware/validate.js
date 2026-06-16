const { body, validationResult } = require('express-validator');

// Función que corta la request si hay errores de validación
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

const registerValidation = [
  body('name').trim().notEmpty().withMessage('El nombre es requerido').isLength({ max: 100 }),
  body('email').isEmail().withMessage('Email inválido').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  validate,
];

const loginValidation = [
  body('email').isEmail().withMessage('Email inválido').normalizeEmail(),
  body('password').notEmpty().withMessage('La contraseña es requerida'),
  validate,
];

const propertyTypeValidation = [
  body('name').trim().notEmpty().withMessage('El nombre es requerido').isLength({ max: 50 }),
  validate,
];

const propertyValidation = [
  body('title').trim().notEmpty().withMessage('El título es requerido').isLength({ max: 200 }),
  body('operationType').isIn(['venta', 'alquiler']).withMessage('Operación inválida'),
  body('price').isNumeric().withMessage('El precio debe ser un número').custom(v => v >= 0),
  body('currency').optional().isIn(['ARS', 'USD']).withMessage('Moneda inválida'),
  body('status').optional().isIn(['disponible', 'reservado', 'vendido']).withMessage('Estado inválido'),
  body('surfaceM2').optional({ nullable: true }).isNumeric().withMessage('Superficie inválida'),
  body('rooms').optional({ nullable: true }).isInt({ min: 0 }).withMessage('Ambientes inválidos'),
  body('propertyType').optional({ nullable: true }).isMongoId().withMessage('Tipo inválido'),
  body('photos').optional().isArray().withMessage('Fotos debe ser un array'),
  validate,
];

module.exports = { registerValidation, loginValidation, propertyTypeValidation, propertyValidation };
