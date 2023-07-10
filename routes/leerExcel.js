const{Router} = require('express');

const { check } = require('express-validator');
const { cargarExcel } = require('../controllers/cargarExcel');
const { validarArchivo } = require('../middlewares/validar-archivo');

const router = Router();

router.post('/', validarArchivo, cargarExcel)

module.exports = router