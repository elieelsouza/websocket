var ws = null;
//var url = "ws://localhost:8080/echo";


function setConnected(connected) {
    document.getElementById('connect').disabled = connected;
    document.getElementById('disconnect').disabled = !connected;
    document.getElementById('echo').disabled = !connected;
}

function connect() {
    ws = new WebSocket("ws://localhost:8080/echo");
    ws.onopen = function() {
        setConnected(true);
        log('Info: Conexao Estabelecida.')
    };

    ws.onmessage = function(event){
        log(event.data);
    };

    ws.onclose = function() {
        setConnected(false);
        log('Info: Fechando conexao.');
    };

}

function disconnect() {
    if (ws != null) {
        ws.close();
        ws = null;
    }
    setConnected(false);
}

function echo() {
    if (ws != null){
        var message = document.getElementById('message').value;
        log('Sent to server :: ' + message);
        ws.send(message);
        
    } else {
        alert(' Conexao nao estabelecida, por favor conecte. ');
    }
}

function log(message)
{
	var console = document.getElementById('logging');
	var p = document.createElement('p');
	p.appendChild(document.createTextNode(message));
	console.appendChild(p);
}