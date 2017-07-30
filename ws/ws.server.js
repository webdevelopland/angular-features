const WebSocket = require("ws");

module.exports = (server) => {
  const WebSocketServer = new WebSocket.Server({ server });

  WebSocketServer.on("connection", (ws) => {
    console.log("Client connected");
    ws.send("Hello");

    ws.on("message", (msg) => {
      console.log("received: "+ msg);
      ws.send("received: "+ msg);
    });

    ws.on("close", () => {
      console.log("Client disconnected")
    });
  });

};