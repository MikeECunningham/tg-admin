import { Component, Inject } from "@angular/core";
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RestService } from "src/services/rest.service";
import { select } from "@angular-redux/store";
import { Observable } from "rxjs";
import { ILoginState } from "src/store/reducers/loginReducer";
import { IProfileState } from "src/store/reducers/profileReducer";

@Component({
  selector: "app-test-passed-dialog",
  templateUrl: "test-passed.component.html",
  styleUrls: ["test-passed.component.scss"],
})
export class TestPassedDialogComponent {

  address = "";
  email = "";
  name = "";
  requestSent = false;

  @select() profile: Observable<IProfileState>;

  constructor(public dialogRef: MatDialogRef<TestPassedDialogComponent>, private restService: RestService) {
    this.profile.subscribe((val) => {
      this.name = val.firstName + " " + val.lastName;
      this.email = val.email;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async sendRequest() {
    this.dialogRef.close();
    const val = await this.restService.requestCard(this.address, this.email, this.name);
    if (val.failure) { alert("Your request couldnt be sent at this time. Please try again later."); } else { alert("Your card request has been sent! It should arrive in the mail."); }
  }
}
