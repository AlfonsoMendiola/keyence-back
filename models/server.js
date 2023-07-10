
const express = require('express')
const cors = require('cors')
const { sqlConnection } = require('../database/config')
const fileupload = require('express-fileupload')


class Server{
    constructor(){
        this.app = express();
        
        this.conectarsql()
        this.middlewares()
        this.routes()
    }

    async conectarsql(){
        await sqlConnection()
    }

    middlewares(){
        this.app.use( cors() )

        this.app.use( express.json() )
        this.app.use( express.urlencoded({extended: true}) )

        this.app.use( express.static('public') )

        this.app.use( fileupload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }) )
    }

    routes(){
        this.app.use('/api/empleados', require('../routes/empleados'))
        this.app.use('/api/asistencias', require('../routes/asistencias'))
        this.app.use('/api/cargar-excel', require('../routes/leerExcel'))
    }

    listen(){
        this.app.listen( process.env.APP_PORT, () => {
            console.log(`Corriendo en el puerto ${process.env.APP_PORT}`);
        } )
    }
}

module.exports = Server