const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = 6969;
const server = http.createServer(express);
const wss = new WebSocket.Server({ server })

function onMessage(data) {
    for(const client of wss.clients) {
	if (client.readyState === WebSocket.OPEN) {
	    client.send(data);
	}
    }
}

function onConnection(ws) {
    ws.on('message', onMessage);
}

wss.on('connection', onConnection );

function onListen() {
  console.log(`Server is listening on ${port}!`)
}

server.listen(port, onListen);
