

// Khoros

var socket = require('socket.io-client')("http://khoros.herokuapp.com/",
    { transports: ['websocket', 'polling'] }
);

var khoros = require('khoros-client');
khoros.init(socket, "chalktalk", "chalktalk");
khoros.listen('event', function(data) {
	console.log(data);
    //if (ws) ws.send(JSON.stringify(data));
});

// Chalktalk

var WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:4040');

ws.on('open', function open() {
	var data = JSON.stringify({ global: "displayListener", value: false });
 	ws.send(data, function (e) {
 		if (e) console.log(e); else console.log("connected");
 	});
});

ws.on('message', function(data, flags) {
	console.log(data);
	data = JSON.parse(data);
	khoros.sing("event", data);
});
