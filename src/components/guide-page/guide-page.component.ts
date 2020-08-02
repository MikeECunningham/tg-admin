import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "src/store/store";
import { ReduxService } from "src/services/redux.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-guide-page",
  templateUrl: "./guide-page.component.html",
  styleUrls: ["./guide-page.component.scss"]
})
export class GuidePageComponent implements OnInit {

  @Input() page: {
    speciesCode: string,
    speciesName: string,
    latinName: string,
    riskLevel: "SAR" | "SNAR" | "INV",
    imageURLs: string[],
    imageCredits: string[],
    descriptions: string[]
  };

  currentImage = 0;

  constructor(private reduxService: ReduxService, private translate: TranslateService) { }

  ngOnInit() {
  }

  setCurrentImage(value) {
    this.currentImage = value;
  }

  resolveRisk(riskLevel): string {
    switch (riskLevel) {
      case "SAR":
        return this.translate.instant("Species at Risk");
      case "SNAR":
        return this.translate.instant("Species Not at Risk");
      case "INV":
        return this.translate.instant("Invasive Species");
      default:
        return this.translate.instant("Risk Unknown");
    }
  }

  goBack() {
    this.reduxService.changeGuidePage("main");
  }
}
