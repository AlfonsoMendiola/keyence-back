

const validarArchivo = (req, res, next) => {
    
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.hojaExcel) {
        return res.status(400).json({msg: 'no hay archivos en la peticion con el campo hojaExcel - validarArchivo'});
    }

    next();
}

module.exports = {
    validarArchivo
}