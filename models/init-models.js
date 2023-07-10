var DataTypes = require("sequelize").DataTypes;
var _asistencias = require("./asistencias");
var _empleados = require("./empleados");

function initModels(sequelize) {
  var asistencias = _asistencias(sequelize, DataTypes);
  var empleados = _empleados(sequelize, DataTypes);

  asistencias.belongsTo(empleados, { as: "id_empleado_empleado", foreignKey: "id_empleado"});
  empleados.hasMany(asistencias, { as: "asistencia", foreignKey: "id_empleado"});

  return {
    asistencias,
    empleados,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
