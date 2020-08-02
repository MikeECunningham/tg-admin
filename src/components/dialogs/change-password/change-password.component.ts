import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { RestService } from "src/services/rest.service";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "src/store/store";
import { Observable, Subscription } from "rxjs";
import { IProfileState } from "src/store/reducers/profileReducer";
import { select } from "@angular-redux/store";
import { profileChangePassword } from 'src/store/actions/profileActions';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})

export class ChangePasswordComponent {

  @select() profile: Observable<IProfileState>;

  currentPassword = "";
  newPassword = "";
  changeConfirmation = "";
  wrongPassword = true;

  constructor(private ngRedux: NgRedux<IAppState>, public dialogRef: MatDialogRef<ChangePasswordComponent>, private restService: RestService) { }

  async changePassword() {
    if (!(await this.restService.sendChangePassword(this.currentPassword, this.newPassword)).failure) {
      this.dialogRef.close();
    }
  }

  ngOnDestroy(): void {
    this.ngRedux.dispatch(profileChangePassword({payload: {failure: ""}}));
  }
}