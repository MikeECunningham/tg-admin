import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { IProfileState } from "src/store/reducers/profileReducer";
import { select } from "@angular-redux/store";
import { ILoginState } from "src/store/reducers/loginReducer";
import { Router } from "@angular/router";
import { RestService } from "src/services/rest.service";
import { MatDialog } from "@angular/material/dialog";
import { TestPassedDialogComponent } from "../dialogs/test-passed/test-passed.component";
import { StoreDataService } from "src/services/store-data.service";
import { TranslateService } from "@ngx-translate/core";
import { DeleteAccountComponent } from "../dialogs/delete-account/delete-account.component";
import { ChangePasswordComponent } from '../dialogs/change-password/change-password.component';


@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent {

  @select() profile: Observable<IProfileState>;
  @select() login: Observable<ILoginState>;

  mode = false;
  modeEdited = false;
  firstName = "";
  lastName = "";
  acceptEmails = false;
  postalCode = "";
  language: string;
  localError = "";
  /** holds user data */

  constructor(public router: Router, private dialog: MatDialog, private restService: RestService, private storedata: StoreDataService, private translate: TranslateService) {
    const store = storedata.getSession().user;
    this.firstName = store.firstName;
    this.lastName = store.lastName;
    this.acceptEmails = store.acceptEmails;
    this.postalCode = store.postalCode;
    this.language = storedata.getLanguage();
  }

  signUpPage() {
    this.router.navigate(["signUp"]);
  }

  loginPage() {
    this.router.navigate([""]);
  }

  changeLanguage(lang: string) {
    this.storedata.setLanguage(lang);
    this.translate.use(lang);
  }

  editMode() {
    if (this.mode) {
      this.mode = false;
      if (this.modeEdited) {
        if (!!this.firstName && this.lastName && this.postalCode) {
          if (this.postalCode.trim().length != 6) { this.localError = "Please make sure your postal code is only the six numbers and letters, no dashes or spaces please!"; return false; }
          this.restService.sendEditProfile(this.firstName.trim(), this.lastName.trim(), this.acceptEmails, this.postalCode);
        }
      }
    } else {
      this.mode = true;
      const store = this.storedata.getSession().user;
      this.firstName = store.firstName;
      this.lastName = store.lastName;
      this.acceptEmails = store.acceptEmails;
      this.postalCode = store.postalCode;
      this.modeEdited = false;
    }
  }

  editChangeMade() {
    this.modeEdited = true;
  }

  changePassword() {
    this.dialog.open(ChangePasswordComponent, {
      width: "350px",
      height: "415px"
    });
  }

  cancelEditMode() {
    this.mode = false;
  }

  logout() {
    this.restService.sendLogout();
  }

  sendCard() {
    this.dialog.open(TestPassedDialogComponent, {
      width: "350px",
      height: "475px"
    });
  }

  takeTest() {
    this.router.navigate(["matchingGame"]);
  }

  deleteDialogue() {
    this.dialog.open(DeleteAccountComponent, {
      width: "370px",
      height: "280px"
    });
  }
}
