import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { ViewEncapsulation } from "@angular/core";
import partners from "./partners";

@Component({
    selector: "app-partners",
    templateUrl: "./partners.component.html",
    styleUrls: ["./partners.component.scss"]
})
export class PartnersComponent {

    partners = partners;

    constructor(private router: Router) { }

    goBack() {
        this.router.navigate([""]);
    }
}
