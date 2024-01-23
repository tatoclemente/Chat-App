const express = require('express');
const http = require('http');
const socketio = require('socket.io')
const path = require('path');
const cors = require('cors')

const Sockets = require('./sockets');const { dbConnection } = require('../database/config');



class Server {

  constructor() {

    this.app = express();
    this.port = process.env.PORT;

    // Cinectar a la BDD

    dbConnection()

    // Http server
    this.server = http.createServer(this.app);

    // Configuracion de sockets 
    this.io = socketio( this.server, { 
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
     } );

  }

  middlewares() {

    this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

    // Configurar CORS
    this.app.use(cors())

    this.app.use( express.json() )

    this.app.use( '/api/login', require('../router/auth') )

    this.app.use( '/api/messages', require('../router/messages') )
  
  }

  configSockets() {

    new Sockets( this.io )

  }

  execute() {

    this.middlewares();

    this.configSockets()

    // Inicializar el server
    this.server.listen( this.port, () => {
      console.log(`Server running on port: ${this.port}`);
    
    } )
  }


}

module.exports = Server;