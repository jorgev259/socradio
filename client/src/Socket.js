import io from 'socket.io-client'
let socket

export const initiateSocket = () => {
  socket = io(`https://${window.location.hostname}`, { path: '/api/socket.io' })
  console.log('Connecting socket...')
}

export const disconnectSocket = () => {
  console.log('Disconnecting socket...')
  if (socket) socket.disconnect()
}

export const subscribeToStation = (station, cb) => {
  socket.on(station, cb)
}

/* export const sendMessage = (room, message) => {
  if (socket) socket.emit('chat', { message, room })
} */
