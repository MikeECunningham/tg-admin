import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NgRedux, select } from "@angular-redux/store";
import { IAppState } from "src/store/store";
import { MatDialog } from "@angular/material/dialog";
import { Observable, Subscription } from "rxjs";
import { ISignupState } from "src/store/reducers/signupReducer";
import { RestService } from "src/services/rest.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
})
export class SignUpComponent {

  @select() signUp: Observable<ISignupState>;

  private signUpSubscription: Subscription;

  email = "";
  firstName = "";
  lastName = "";
  password = "";
  confirmPassword = "";
  postalCode = "";
  reference = "";
  otherReference = "";
  acceptEmails = false;
  localError = "";

  constructor(private ngRedux: NgRedux<IAppState>, public router: Router, private dialog: MatDialog, public restService: RestService) { }

  async signup() {
    if (this.postalCode.trim().length != 6) { this.localError = "Please make sure your postal code is only the six numbers and letters, no dashes or spaces please!"; return false; }
    if (this.otherReference.trim().length > 200) { this.localError = "We love hearing from you, but the other reference field can only hold 200 characters - please trim it down!"; return false; }
    if (this.password.length < 8) { this.localError = "Your password needs to be over 8 characters long"; return false; }
    this.restService.sendLogout();
    let response = await this.restService.sendSignup(this.email.trim(), this.password, this.confirmPassword, this.firstName.trim(), this.lastName.trim(), this.reference == "Other" ? this.otherReference.trim() : this.reference.trim(), this.acceptEmails, this.postalCode.trim());
    if (!response.failure) {
      this.router.navigate(["activate"]);
    }
  }

  showTerms() {
    this.router.navigate(["tos"]);
  }

  showPrivacy() {
    this.router.navigate(["priv"]);
  }

  goBack() {
    this.router.navigate([""]);
  }
}