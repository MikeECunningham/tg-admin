import { Component, Inject } from "@angular/core";
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RestService } from "src/services/rest.service";

@Component({
  selector: "app-test-explanation-dialog",
  templateUrl: "test-explanation.component.html",
  styleUrls: ["test-explanation.component.scss"],
})
export class TestExplanationDialogComponent {

  constructor(public dialogRef: MatDialogRef<TestExplanationDialogComponent>, private restService: RestService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  startTest() {
    this.dialogRef.close();
  }
}
