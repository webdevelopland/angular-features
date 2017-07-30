import * as js from "libraryjs";

export class Subscribe {
  service:any;
  events:any;

  constructor( service:any ) {
    var f = this;

    f.service = service;
    f.events = {};
  }

  subscribe(event, callback) {
    var f = this;

    if (js.not( f.service.events[event] )) throw new Error("Wrong event");
    if (js.is( f.events[event] )) f.unsubscribe(event);

    f.events[event] = f.service.events[event].push(callback);
  }

  unsubscribe(event) {
    var f = this;

    if (js.not( f.service.events[event] )) throw new Error("Wrong event");
    if (js.not( f.events[event] )) return;

    f.service.events[event].remove( f.events[event] );
    delete f.events[event];
  }

  run() {
    var f = this;

    for(let event in f.events) {
      f.service.events[event].pick(f.events[event]);
    }
  }

  remove() {
    var f = this;

    for(let event in f.events) {
      f.service.events[event].remove( f.events[event] );
    }
  }

}