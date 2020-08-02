import { Component, OnDestroy, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { NgRedux, select } from "@angular-redux/store";
import { IAppState } from "src/store/store";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ILoginState, loginReducer } from "src/store/reducers/loginReducer";
import { Observable, Subscribable, Subscription } from "rxjs";
import { RestService } from "src/services/rest.service";
import config from "src/config";
import { CdkAccordion } from "@angular/cdk/accordion";
import { BlockingOverlayDialogComponent } from "../dialogs/blocking-overlay/blocking-overlay-dialog.component";
import { StoreDataService } from "src/services/store-data.service";
import { TranslateService } from '@ngx-translate/core';

declare var facebookConnectPlugin: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {

  email = "";
  password = "";
  height = 0;
  width = 0;
  localError: "";
  language: string;

  @select() login: Observable<ILoginState>;
  private loginSubscription: Subscription;
  _login: ILoginState;

  dialogRef: MatDialogRef<BlockingOverlayDialogComponent>;

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public router: Router,
    public dialog: MatDialog,
    public restService: RestService,
    private cd: ChangeDetectorRef,
    private storedata: StoreDataService,
    private translate: TranslateService
  ) {
    this.language = storedata.getLanguage();
  }

  ngOnInit() {
    // Gets the windows height and width on load so the keyboard does not affect the dom
    this.height = screen.height;
    this.width = screen.width;
    // Redirect to the menu page when the user is logged in
    this.loginSubscription = this.login.subscribe((val) => {
      this._login=val;
      if (!val.loggingIn && this.dialogRef) {
        this.dialogRef.close();
        this.dialogRef = null;
      }
    });
  }

  ngOnDestroy() {
    // Destroy the login subscription to prevent any strange behavior
    this.loginSubscription.unsubscribe();
  }

  async emailLogin() {
    await this.restService.sendLogin(this.email.trim(), this.password);
    if (!this._login.isActivated && this._login.loggedIn) {
      this.router.navigate(["activate"]);
    } else if (this._login.loggedIn) {
      this.router.navigate(["menu"]);
    }
  }

  signup() {
    this.router.navigate(["signUp"]);
  }

  facebookLogin() {
    this.dialogRef = this.dialog.open(BlockingOverlayDialogComponent, {
      width: "100vw",
      height: "100vh",
      maxHeight: "100vh",
      maxWidth: "100vw",
      panelClass: "transparent"
    });
    facebookConnectPlugin.login(["public_profile"], (data) => {
      this.restService.sendFacebookLogin({ token: data.authResponse.accessToken });
      this.cd.detectChanges();
    }, () => {

    });
  }

  twitterLogin() {
    alert("Feature not implemented yet.");
  }

  googleLogin() {
    alert("Feature not implemented yet.");
  }

  changeLanguage(lang: string) {
    this.storedata.setLanguage(lang);
    this.translate.use(lang);
  }

  skipLogin() {
    this.router.navigate(["menu"]);
  }

  forgotPassword() {
    this.router.navigate(["password"]);
  }

  showTerms() {
    this.router.navigate(["tos"]);
  }

  showPartners() {
    this.router.navigate(["partners"]);
  }
}
