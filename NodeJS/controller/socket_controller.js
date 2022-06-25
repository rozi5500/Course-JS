const sendMessage = (io, socket) => {
  socket.emit('message:saved', { age: 19 })
};

const broadcastToAllUsers = (io, socket, data) => {
  socket.join('room102')

  console.log(socket.handshake, 'HANDSHAKE');

  io.emit('broadcast:test', { weather: 'cold' })
}

const broadcastAvoidSender = (io, socket) => {
  // This avoids sender
  socket.broadcast.emit('broadcast:not:me', {})

  io.to('room102').emit('Hello user', 205)

  socket.leave('room102')
}


module.exports = {
  sendMessage,
  broadcastToAllUsers,
  broadcastAvoidSender
};
