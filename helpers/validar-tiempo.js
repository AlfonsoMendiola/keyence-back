const validarHora = (hora) => {
    const horaValidaExpReg = /^(?:2[0-3]|[01]?[0-9]):[0-5][0-9]$/;
    if( !horaValidaExpReg.test(hora) ) throw new Error('La hora debe estar en formato HH:MM')
    return true
}

const validarFecha = (fecha) => {
    const fechaValidaExpReg = /^\d{4}-\d{2}-\d{2}$/;
    if( !fechaValidaExpReg.test(fecha) ) throw new Error('La fecha debe estar en formato YYYY-MM-dd')
    return true

}

module.exports = {validarHora, validarFecha}