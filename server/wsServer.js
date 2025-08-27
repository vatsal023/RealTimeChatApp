const ws = require("ws");

const createWebSocketServer = (server) => {
    const wss = new ws.WebSocketServer({server})
}