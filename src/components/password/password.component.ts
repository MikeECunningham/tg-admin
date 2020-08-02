import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { NgRedux, select } from "@angular-redux/store";
import { IAppState } from "src/store/store";
import { MatDialog } from "@angular/material/dialog";
import { RestService } from "src/services/rest.service";
import { Observable } from "rxjs";
import { IResetPasswordState } from "src/store/reducers/resetPasswordReducer";

@Component({
  selector: "app-password",
  templateUrl: "./password.component.html",
  styleUrls: ["./password.component.scss"],
})
export class PasswordComponent {

  email = "";
  @select() password: Observable<IResetPasswordState>;

  constructor(private ngRedux: NgRedux<IAppState>, public router: Router, public dialog: MatDialog, public restService: RestService) {

  }

  goBack() {
    this.router.navigate([""]);
  }

  sendReset() {
    this.restService.sendResetPassword(this.email);
  }
}
