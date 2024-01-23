

class Sockets {

  constructor( io ) {

    this.io = io;

    this.socketsEventes();
    
  }

  socketsEventes() {

    // On connection
    this.io.on('connection', ( socket ) => { 

      // Todo: Validar el JWT
      // Si el token no es válido, desconectar

      // Todo: Saber que usuario está activo

      // Todo: Emitir todos los usuarios conectados

      // Todo: Socket Join, uid

      // Todo: Escuchar el cliente emite un mensaje
      // mensaje-personal

      // Todo: Disconnect
      // Marcar en la BD que el usuario está desconectado

      // Todo: Emitir todos los usuarios conectados
      
    }); 
  }

}


module.exports = Sockets;