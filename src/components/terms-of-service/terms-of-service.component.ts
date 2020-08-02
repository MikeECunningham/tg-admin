import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { ViewEncapsulation } from "@angular/core";

@Component({
    selector: "app-terms-of-service",
    templateUrl: "./terms-of-service.component.html",
    styleUrls: ["./terms-of-service.component.scss"]
})
export class TermsOfServiceComponent {


    constructor(private router: Router) { }

    goBack() {
        this.router.navigate([""]);
    }
}
