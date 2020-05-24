var socket = io.connect('*** WS Server address ***');
var live = document.getElementById('live');

socket.on('message', message => {
    live.innerHTML = message;
});