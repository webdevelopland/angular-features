(()=>{

  var HOST = location.origin.replace(/^http/, "ws") + "/ws";
  var ws = new WebSocket(HOST);

  ws.onopen = function() {
    console.log("Connected");

    ws.send("Sup");
  };

  ws.onclose = function(event) {
    if (event.wasClean) {
      console.log("Closed");
    } else {
      console.log("Broken"); // например, "убит" процесс сервера
    }
    console.log("Code: " + event.code);
    console.log("Reason: " + event.reason);
  };

  ws.onmessage = function(event) {
    console.log(event.data);
  };

  ws.onerror = function(error) {
    console.log("Error: " + error.message);
  };

})();