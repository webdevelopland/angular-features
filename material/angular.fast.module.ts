// import all Angular Modules

// ...

// —————————————————————— Material ——————————————————————
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import * as MaterialLibrary from "@angular/material";
var material = [];
for(let name in MaterialLibrary) {
  if ( name.search( /^Mat[a-z]+Module$/i ) !== -1)
  material.push(MaterialLibrary[name]);
}

import "hammerjs";

// ...

// ———————————————————————————————— NgModule ————————————————————————————————
@NgModule({
  declarations: [
    // ...
  ],
  imports: [
    // ...

    BrowserAnimationsModule,

    // ...
  ].concat(material),
  providers: [
    // ...
  ],
  bootstrap: [ AngularComponent ]
})
export class AngularModule {}