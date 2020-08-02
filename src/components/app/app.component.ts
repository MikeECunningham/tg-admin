import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RestService } from "src/services/rest.service";
import { StoreDataService } from "src/services/store-data.service";
import config from "src/config";
import { Meta, DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [RestService, StoreDataService]
})
export class AppComponent {

  constructor() { }

}
