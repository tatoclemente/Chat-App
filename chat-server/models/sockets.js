const { userConnect, userDisconnect, getUsers, saveMessage } = require("../controllers/socket");
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
      
      // Socket Join, uid
      socket.join( uid )

      // Todo: Validar el JWT
      // Si el token no es válido, desconectar

      // Todo: Saber que usuario está activo

      // Todo: Emitir todos los usuarios conectados

      const users = await getUsers()
      this.io.emit('users-list', users)


      // Escuchar el cliente emite un mensaje
      socket.on('private-message', async ( payload ) => {
          const message = await saveMessage( payload )
          this.io.to(payload.to).emit('private-message', message)
          this.io.to(payload.from).emit('private-message', message)
      })
      // mensaje-personal

      // Todo: Disconnect
      // Marcar en la BD que el usuario está desconectado

      // Todo: Emitir todos los usuarios conectados


      socket.on('disconnect', async () => {
        
        const user = await userDisconnect( uid )
        console.log('Se desconecto ' + user.name);

        const users = await getUsers()
        this.io.emit('users-list', users)
      })
      
    }); 
  }

}


module.exports = Sockets;