const initModels = require('../models/init-models')
const {db} = require('../database/config')
const models = initModels(db)


const empleadosController = {
    
    postEmpleado: async(req, res) => {
        try {
            const [empleado, created] = await models.empleados.findOrCreate({
                where:{name: req.body.name}
            })
            
            res.json({empleado, previuslyCreated: !created})
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: `${error}`})
        }
    },

    getEmpleados: async(req, res) => {
        try {
            const {offset = 0} = req.query
            
            if (!req.query.limit) {
                const {count: total, rows: data} = await models.empleados.findAndCountAll({ order: ['id'] })
                return res.json({total, data})
            }
            
            const {count: total, rows: data} = await models.empleados.findAndCountAll({
                limit: Number(req.query.limit), 
                offset: Number(offset), 
                order:['id']
            })
            
            res.json({total, data})
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: `${error}`})
        }
    },

    getEmpleado: async(req, res) => {
        try {
            const data = await models.empleados.findByPk(req.params.id)

            if(data == null) return res.status(404).json({error: 'empleado no encontrado'})

            res.json(data)
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: `${error}`})
        }
    },

    updateEmpleado: async(req, res) => {
        try {
            
            const data = await models.empleados.findByPk(req.params.id)
            if(data == null) return res.status(404).json({error: 'empleado no encontrado'})
            data.name = req.body.name
            await data.save()

            res.json(data)
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: `${error}`})
        } 
    },

    // borrado fisico
    deleteEmpleado: async(req, res) => {
        try {
            const info = await models.empleados.findByPk(req.params.id)
            if(info == null) return res.status(404).json({error: 'empleado no encontrado'})

            const data = await models.empleados.destroy({
                where: {id: req.params.id}
            })
            
            res.json(data)
        } catch (error) {
            console.log(error);
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                return res.status(400).json({error: 'no se puede borrar porque el registro se esta usado en otra tabla'})
            } else {
                return res.status(400).json({error: `${error}`})
            }
        } 
    }
}


module.exports = { empleadosController }