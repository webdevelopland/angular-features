import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterService } from "@/services/router.service";
import { WebSocketService } from "@/services/ws.service";
import { Subscribe } from "@/services/subscribe";

@Component({
  templateUrl: "./template.html"
})
export class WebSocketComponent {
  data:any = {};
  wss:Subscribe;
  isConnected:boolean = false;
  constructor(
    public ws:WebSocketService
  ) {
    this.wss = new Subscribe(ws);
    this.connect();
  }

  connect() {
    var HOST = location.origin.replace(/^http/, "ws") + "/ws";
    this.ws.connect(HOST, () => {
      this.isConnected = true;

      this.wss.subscribe("message", (res) => {
        var msg = res.data;
        console.log(msg);
      });

      this.wss.subscribe("close", (event) => {
        // ...
      });

      this.ws.send("sup");

    });
  }

  close() {
    this.ws.close();
  }

}