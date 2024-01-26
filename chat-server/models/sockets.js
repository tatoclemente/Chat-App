const { userConnect, userDisconnect, getUsers } = require("../controllers/socket");
const { checkJWT } = require("../helpers/jwt");


class Sockets {

  constructor( io ) {

    this.io = io;

    this.socketsEventes();
    
  }

  socketsEventes() {

    // On connection
    this.io.on('connection', async ( socket ) => { 

      const token = socket.handshake.query['x-token'];

      const [valid, uid] = checkJWT(token)

      if(!valid){
        console.log('Socket no indetyfy');
        return socket.disconnect();
      } 

      const user = await userConnect( uid )

      console.log('Se conecto ' + user.name);

      // Todo: Validar el JWT
      // Si el token no es válido, desconectar

      // Todo: Saber que usuario está activo

      // Todo: Emitir todos los usuarios conectados

      const users = await getUsers()
      this.io.emit('users-list', users)

      // Todo: Socket Join, uid

      // Todo: Escuchar el cliente emite un mensaje
      // mensaje-personal

      // Todo: Disconnect
      // Marcar en la BD que el usuario está desconectado

      // Todo: Emitir todos los usuarios conectados


      socket.on('disconnect', async () => {
        
        const user = await userDisconnect( uid )
        console.log('Se desconecto ' + user.name);
      })
      
    }); 
  }

}


module.exports = Sockets;