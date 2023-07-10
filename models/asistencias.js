const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('asistencias', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    punch_in: {
      type: DataTypes.TIME,
      allowNull: true
    },
    punch_out: {
      type: DataTypes.TIME,
      allowNull: true
    },
    id_empleado: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'empleados',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'asistencias',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "id_empleado",
        using: "BTREE",
        fields: [
          { name: "id_empleado" },
        ]
      },
    ]
  });
};
