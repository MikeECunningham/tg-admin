import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./modules/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}
if (isApp()) {
  document.addEventListener("deviceready", onDeviceReady, false);
  document.addEventListener("backbutton", function(e) {
    e.preventDefault();
  }, false);
  const s = this.document.createElement("script");
  s.type = "text/javascript";
  s.src = "cordova.js";
} else { onDeviceReady(); }

function onDeviceReady() {
  console.log("device ready");
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
}

window.addEventListener("beforeinstallprompt", (e: any) => {
  e.prompt();
});

function isApp() {
  return ((window as any).cordova || (window as any).PhoneGap || (window as any).phonegap)
    && /^file:\/{3}[^\/]/i.test(window.location.href)
    && /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent);
}
