import { io } from 'socket.io-client'
import { BASE_URL } from '../../domain'
const URL = `${BASE_URL}`
const socket = io(URL,{ transports: ["websocket"]})

const socketController = (state = socket, action) => {
    return state
}
export default socketController