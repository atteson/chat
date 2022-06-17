const WebSockets = require( 'ws' );

const wss = new WebSockets.WebSocketServer({ port: 6969 });

function onMessage(data) {
    for(const client of wss.clients) {
	if (client.readyState === WebSockets.OPEN) {
	    client.send(data);
	}
    }
}

function onConnection(ws) {
    ws.on('message', onMessage);
}

wss.on('connection', onConnection );

function onListen() {
  console.log(`Server is listening!`)
}

wss.on('listening', onListen);