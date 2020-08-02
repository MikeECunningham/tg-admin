import { Component } from "@angular/core";
import { select, NgRedux } from "@angular-redux/store";
import { Observable } from "rxjs";
import { IGuideState } from "src/store/reducers/guideReducer";
import { IAppState } from "src/store/store";
import { ReduxService } from "src/services/redux.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-activities",
  templateUrl: "./activities.component.html",
  styleUrls: ["./activities.component.scss"]
})
export class ActivitiesComponent {

  @select() guide: Observable<IGuideState>;

  constructor(public router: Router, public ngRedux: NgRedux<IAppState>, public reduxService: ReduxService, private dialog: MatDialog) { }

  takeTest() {
    this.router.navigate(["matchingGame"]);
  }

}
