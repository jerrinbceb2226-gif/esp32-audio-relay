const WebSocket = require('ws');
const PORT = process.env.PORT || 10000;
const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', function connection(ws) {
  console.log("🟢 Device connected to the Relay!");
  
  ws.on('message', function incoming(data) {
    // Bounce the continuous audio stream to all connected devices (your laptop)
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
  
  ws.on('close', () => console.log("🔴 Device disconnected."));
});

console.log('🚀 WebSocket relay running on port', PORT);
