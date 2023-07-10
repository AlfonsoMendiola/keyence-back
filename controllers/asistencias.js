const initModels = require('../models/init-models')
const {db} = require('../database/config')
const { validarHora } = require('../helpers/validar-tiempo')

const models = initModels(db)


const asistenciasController = {
    
    postAsistencia: async(req, res) => {
        try {
            const {id_empleado, fecha = Date(Date.now()), punch_in, punch_out} = req.body
            const info = {
                id_empleado,
                fecha: new Date(fecha).toISOString().split('T')[0],
                punch_in
            }
            if (punch_out && validarHora(punch_out)) info.punch_out = punch_out
            
            const data = await models.asistencias.create(info)
            
            res.json({data})
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: `${error}`})
        }
    },

    getAsistencias: async(req, res) => {
        try {
            const {offset = 0} = req.query
            // refactor pendiente
            if (!req.query.limit) {
                const {count: total, rows: data} = await models.asistencias.findAndCountAll({ 
                    include:{
                        model: models.empleados, 
                        as:'id_empleado_empleado',
                    },
                    attributes:{ exclude: ['id_empleado'] },
                    order:[ ['id', 'DESC'] ]
                })
                
                return res.json({total, data})
            }
            
            const {count: total, rows: data} = await models.asistencias.findAndCountAll({
                include:{
                    model: models.empleados, 
                    as:'id_empleado_empleado',
                },
                attributes:{ exclude: ['id_empleado'] },
                limit: Number(req.query.limit), 
                offset: Number(offset), 
                order:[ ['id', 'DESC'] ]
            })
            
            res.json({total, pages: Math.ceil(total / req.query.limit), data})
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: `${error}`})
        }
    },

    getAsistencia: async(req, res) => {
        try {
            const data = await models.asistencias.findByPk(req.params.id,{
                include: {
                    model: models.empleados,
                    as: 'id_empleado_empleado'
                }
            })

            if(data == null) return res.status(404).json({error: 'asistencia no encontrada'})

            res.json(data)
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: `${error}`})
        }
    },

    updateAsistencia: async(req, res) => {
        try {
            
            const data = await models.asistencias.findByPk(req.params.id, {
                include: {
                    model: models.empleados,
                    as: 'id_empleado_empleado'
                }
            })
            if(data == null) return res.status(404).json({error: 'asistencia no encontrada'})

            data.fecha = req.body.fecha
            data.punch_in = req.body.punch_in
            data.punch_out = req.body.punch_out
            await data.save()

            res.json(data)
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: `${error}`})
        } 
    },

    // borrado fisico
    deleteAsistencia: async(req, res) => {
        try {
            const data = await models.asistencias.findByPk(req.params.id, {
                include: {
                    model: models.empleados,
                    as: 'id_empleado_empleado'
                }
            })
            if(data == null) return res.status(404).json({error: 'asistencia no encontrada'})
            
            data.destroy()
            
            res.json(data)
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: `${error}`})
        } 
    }

    // getAsistenciasByFecha getAsistenciaByIdEmpleado desde vista_asistencias || parametrizar where pendiente? 
}



module.exports = { asistenciasController }