import { Injectable } from "@angular/core";
import { HttpService } from "@/services/http.service";
import * as js from "libraryjs";

@Injectable()
export class UserService {

  online:boolean = false;
  isLoading:boolean = true;

  events:any = {};
  waiters:any = {};
  data:any = {};

  constructor (
    private http:HttpService
  ) {
    var f = this;

    f.events.logIn = new js.Events();
    f.events.logOut = new js.Events();
    f.events.connect = new js.Events();

    f.waiters.refresh = false;
    f.waiters.signUp = false;
    f.waiters.logIn = false;

    f.refresh();

  }

  //Events
  subscribe(event:string, callback:any) {
    var f = this;

    var smartPushList = [
      { event: "online", eventsName: "logIn", toggle: f.online },
      { event: "offline", eventsName: "logOut", toggle: !f.online },
      { event: "connect", eventsName: "connect", toggle: !f.isLoading },
    ];
    
    for(let smartpush of smartPushList) {
      if (smartpush.event === event) {
        let id = f.events[smartpush.eventsName].push(callback);
        if (smartpush.toggle) callback(id);
        return id;
      }
    }

  }
  unsubscribe(event:string, id:string) {
    var f = this;

    var removeList = [
      { event: "online", eventsName: "logIn" },
      { event: "offline", eventsName: "logOut" },
      { event: "connect", eventsName: "connect" },
    ];

    for(let item of removeList) {
      if (item.event === "online") {
        f.events[item.eventsName].remove(id);
      }
    }

  }

  //Catch changing online/offline
  auth(online) {
    var f = this;

    if (!f.online && online) {
      f.online = true;
      f.events.logIn.idrun();
    }
    else if (f.online && !online) {
      f.online = false;
      f.data = {};
      f.events.logOut.idrun();
    }

    if (f.isLoading) {
      f.events.connect.idrun();
    }
    f.isLoading = false;
  }

  //Create a new account
  signUp(signUpData:any, callback?:any) {
    var f = this;

    if (f.waiters.signUp) return;

    f.waiters.signUp = true;
    f.http.post({
      url: "/ajax",
      json: {
        ajax: "sign-up",
        newuser: signUpData
      },
      callback: (res) => {
        f.waiters.signUp = false;
        if ( js.is(callback) ) callback(res);
      }
    });
  }

  //Save received user data from server
  save(res:any) {
    var f = this;

    if (res.error) {
      if ((new js.Errors()).importErrors(res).checkError("cookieOutdated")) {
        js.delCookie("key");
      }
      f.auth(false);
      return;
    }
    if ( js.not(res.pkg) ) {
      //User data is incorrect. Log-in is failed
      f.auth(false);
      return;
    }
    f.data = res.pkg;
    js.setCookie("key", f.data.cookie);
    f.auth(true);
  }

  //Log in & log out
  logIn(logInData:any, callback?:any) {
    var f = this;

    if (f.waiters.logIn) return;

    f.logOut(() => {

      f.isLoading = true;
      f.waiters.logIn = true;

      f.http.post({
        url: "/ajax",
        json: {
          ajax: "log-in",
          user: logInData
        },
        callback: (res) => {
          f.waiters.logIn = false;
          f.save(res); //errors handler inside
          if ( js.is(callback) ) callback(res);
        }
      });

    });
  }
  logOut(callback?:any) {
    var f = this;

    f.isLoading = true;
    f.auth(false);
    f.data = {};

    var cookie = f.key();
    if ( js.is(cookie) ) {
      js.delCookie("key");
      f.http.post({
        url: "/ajax",
        json: {
          ajax: "log-out",
          cookie: cookie
        },
        callback: (res) => {
          if ( js.is(callback) ) callback(res);
        }
      });
    }
    else if ( js.is(callback) ) callback(null);
  }

  //Load user data from server
  //need cookie
  refresh() {
    var f = this;

    if (f.waiters.refresh) return;

    var cookie = f.key();
    if ( js.not(cookie) ) {
      f.auth(false);
      return;
    }

    f.isLoading = true;
    f.waiters.refresh = true;

    f.http.post({
      url: "/ajax",
      json: {
        ajax: "get-user",
        cookie: cookie
      },
      callback: (res) => {
        f.waiters.refresh = false;
        f.save(res); //errors handler inside
      }
    });
  }

  key() {
    return js.getCookie("key");
  }

}