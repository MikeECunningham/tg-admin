import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd, Router, ActivatedRoute } from "@angular/router";
import { share, switchMap } from "rxjs/operators";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {

  routeSubscription: Subscription;
  /** The position of the tab currently being viewed */
  pagePosition: number = 0;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params.subscribe((params)=>{
      if(params.page){ this.pagePosition=params.page; }
    });
  }
}
