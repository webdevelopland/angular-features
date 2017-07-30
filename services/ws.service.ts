import { Injectable } from "@angular/core";
import * as js from "libraryjs";

@Injectable()
export class WebSocketService {
  ws:WebSocket;
  isOpened:boolean = false;
  events:any = {};

  constructor() {
    var f = this;
    f.events.close = new js.Events();
    f.events.message = new js.Events();
  }

  connect(host, callback?) {
    var f = this;
    f.ws = new WebSocket(host);

    f.ws.onopen = () => {
      f.isOpened = true;
      if (callback) callback();
    };

    f.ws.onclose = (event) => {
      f.isOpened = false;
      f.events.close.idrun(event);
    };

    f.ws.onmessage = (event) => {
      f.events.message.idrun(event);
    };
  }

  send(pkg) {
    var f = this;
    if (!f.isOpened) return;

    f.ws.send(pkg);
  }

  close() {
    var f = this;
    f.isOpened = false;
    f.ws.close();
  }
}