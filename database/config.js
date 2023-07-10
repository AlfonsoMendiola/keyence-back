const { Sequelize } = require('sequelize')

const db = new Sequelize(process.env.MYSQL_DB_NAME, process.env.MYSQL_USERNAME, process.env.MYSQL_PASS, {
    host: process.env.MYSQL_SERVER,
    dialect: 'mysql'
})

const sqlConnection = async() => {
    try {
        await db.authenticate();
        console.log('MySQL en linea')
    } catch (error) {
        console.log(`${error}`);
        throw new Error('Error al conectar en MySQL')
    }
}

module.exports = {sqlConnection, db}