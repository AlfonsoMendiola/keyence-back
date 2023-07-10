const initModels = require('../models/init-models')
const {db} = require('../database/config')

const XLSX = require("xlsx");

const models = initModels(db)

const cargarExcel = async(req, res) => {
    try {

        const excelJson = () => {
            const excel = XLSX.readFile(req.files.hojaExcel.tempFilePath)
            const nombreHoja = excel.SheetNames
            return XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]], {
                raw: false
            })
        }
        const info = excelJson().map(item => {
            return{
                id_empleado: Number(item['Employee ID']),
                name: item['Employee Name'],
                fecha: new Date(item.Date).toISOString().split('T')[0],
                punch_in: item['Punch In'],
                punch_out: item['Punch Out']
            }
        })

        const data = await models.asistencias.bulkCreate(info)

        
        res.json(data)
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({error})
    }
}

module.exports = {
    cargarExcel
}