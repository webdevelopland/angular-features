import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterService } from "@/services/router.service";
import { WebSocketService } from "@/services/ws.service";
import { Subscribe } from "@/services/subscribe";

@Component({
  templateUrl: "./template.html"
})
export class WebSocketComponent {
  subs:any = {};

  constructor(
    public title:Title,
    public router:RouterService,
    public ws:WebSocketService
  ) {
    var f = this;
    f.title.setTitle("Second Page");

    f.subs.ws =       new Subscribe(ws);
    f.subs.router =   new Subscribe(router);

    var HOST = location.origin.replace(/^http/, "ws") + "/ws";
    ws.connect(HOST, () => {
      console.log("ws server has been connected");

      f.subs.ws.subscribe("message", (id, res) => {
        console.log(res.data);
      });

      f.subs.ws.subscribe("close", (id, event) => {
        console.log("ws server has been closed");
      });

      ws.send("test message");
    });

    f.subs.router.subscribe("refresh", () => {
      f.subs.ws.remove();
      f.ws.close();
    });
  }

  close() {
    var f = this;
    f.ws.close();
  }

}