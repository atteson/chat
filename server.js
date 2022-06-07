const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = 6969;
const server = http.createServer(express);
const wss = new WebSocket.Server({ server })

//server.listen(port, function() {
//  console.log(`Server is listening on ${port}!`)
//})

//function onMessage(data) {
//    for(var client in wss.clients) {
//	if (client.readyState === WebSocket.OPEN) {
//	    client.send(data);
//	}
//    }
//}

function onConnection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  })
}

wss.on('connection', onConnection );

//wss.on('connection', function connection(ws) {
//  ws.on('message', function incoming(data) {
//    wss.clients.forEach(function each(client) {
//      if (client.readyState === WebSocket.OPEN) {
//        client.send(data);
//      }
//    })
//  })
//})

function onListen() {
  console.log(`Server is listening on ${port}!`)
}

server.listen(port, onListen);
