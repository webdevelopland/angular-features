import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subscribe } from "@/services/subscribe";
import * as js from "libraryjs";

declare var $:any;

@Injectable()
export class RouterService {

  events:any = {};

  constructor (
    private router:Router
  ) {
    var f = this;

    f.events.refresh = new js.Events();
    f.events.refreshing = new js.Events();

    f.router.events.subscribe((event) => {
      if (event.constructor.name === "NavigationStart") {
        f.refreshPage();
      }
    });
  }

  refreshPage() {
    var f = this;
    f.events.refresh.idrun();
    f.events.refresh = new js.Events();

    f.events.refreshing.idrun();
  }

  open(url) {
    var f = this;
    f.router.navigate([ url ]);
  }

}