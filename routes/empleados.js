const{Router} = require('express')

const { check } = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')
const { empleadosController } = require('../controllers/empleados')

const router = Router()

router.post('/', [
    check('name', 'Atributo name es obligatorio').not().isEmpty(),
    validarCampos
], empleadosController.postEmpleado)

router.get('/', empleadosController.getEmpleados)

router.get('/:id', empleadosController.getEmpleado)

router.put('/:id', empleadosController.updateEmpleado)

router.delete('/:id', empleadosController.deleteEmpleado)



module.exports = router