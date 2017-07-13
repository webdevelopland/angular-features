import { Injectable } from "@angular/core";
import { Subscribe } from "@/services/subscribe";
import * as js from "libraryjs";

@Injectable()
export class ScrollService {

  events:any = {};

  constructor() {
    var f = this;

    f.events.scroll = new js.Events();

    document.onscroll = () => {
      f.events.scroll.run( f.scrollTop() );
    };
  }

  scrollTop() {
    return document.documentElement.scrollTop || document.body.scrollTop;
  }
  
  setScrollTop(scrollTop) {
    document.body.scrollTop = scrollTop;
    document.documentElement.scrollTop = scrollTop;
  }

}

@Injectable()
export class SubScrollService extends Subscribe {

  constructor(
    private scroll:ScrollService
  ) {
    super();
    var f = this;
    f.service = scroll;
  }

}