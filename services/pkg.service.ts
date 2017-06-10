import { Injectable } from "@angular/core";
import * as js from "libraryjs";

@Injectable()
export class PkgService {

  post(param:any) {

    var req:XMLHttpRequest = new XMLHttpRequest();
    req.open( "POST", param.url, true);

    // req.upload.onprogress = (event) => {
    //   console.log(event.loaded + " / " + event.total);
    // };

    req.onload = req.onerror = () => {
      var json = JSON.parse(req.response);
      if (js.is(json) && json) {
        if (js.is(param.onload)) param.onload(json);
      }
    };

    var formData:FormData = new FormData();

    if (js.is(param.options)) {
      for (let i in param.options) {
        formData.append( i, param.options[i] );
      }
    }
    if (js.is(param.files)) for (let i=0; i < param.files.length; i++) {
      formData.append("file[]", param.files[i], param.files[i].name);
    }

    req.send(formData);
  }

  get(param:any) {

    var req:XMLHttpRequest = new XMLHttpRequest();
    req.open( "GET", param.url, true);

    req.onload = req.onerror = () => {
      param.callback( req );
    }

    req.send();
  }
  
}