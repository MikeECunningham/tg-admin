import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { RestService } from "src/services/rest.service";

@Component({
  selector: "app-delete-account",
  templateUrl: "./delete-account.component.html",
  styleUrls: ["./delete-account.component.scss"]
})
export class DeleteAccountComponent {

  deleteConfirmation = "";

  constructor(public dialogRef: MatDialogRef<DeleteAccountComponent>, private restService: RestService) { }

  deleteAccount() {
    this.restService.sendDeleteAccount();
    this.dialogRef.close();
  }
}