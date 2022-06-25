const {socket_controller} = require('../controller')

module.exports = (io, socket) => {
  socket.use((infoArray, next) => {
    console.log(infoArray);

    next()
  })

  socket.on('message:created', () => socket_controller.sendMessage(io, socket));

  socket.on('broadcast:all:users', (data) => socket_controller.broadcastToAllUsers(io, socket, data));

  socket.on('broadcast:avoid:sender', () => socket_controller.broadcastAvoidSender(io, socket));
}
