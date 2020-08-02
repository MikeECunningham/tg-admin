import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "src/store/store";
import { RestService } from "src/services/rest.service";

@Component({
  selector: "app-activate",
  templateUrl: "./activate.component.html",
  styleUrls: ["./activate.component.scss"],
})
export class ActivateComponent implements OnInit, OnDestroy {

  constructor(private restService: RestService, public router: Router) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }

  goBack() {
    this.router.navigate([""]);
  }

  resend() {
    this.restService.sendRequestVerificationEmail();
  }
}