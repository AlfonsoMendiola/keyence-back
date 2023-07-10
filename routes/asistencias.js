const{Router} = require('express')

const { check } = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')
const { asistenciasController } = require('../controllers/asistencias')
const { validarHora, validarFecha } = require('../helpers/validar-tiempo')

const router = Router()

router.post('/', [
    check('id_empleado', 'El id es obligatorio y numerico').isNumeric(),
    check('punch_in').custom(validarHora),
    check('fecha').custom(validarFecha),
    validarCampos
], asistenciasController.postAsistencia)

router.get('/', asistenciasController.getAsistencias)

router.get('/:id', asistenciasController.getAsistencia)

router.put('/:id', [
    //check('punch_in').custom(validarHora),
    check('fecha').custom(validarFecha),
    validarCampos
], asistenciasController.updateAsistencia)

router.delete('/:id', asistenciasController.deleteAsistencia)



module.exports = router