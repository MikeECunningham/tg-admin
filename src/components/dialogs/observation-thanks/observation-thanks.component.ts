import { Component, Inject } from "@angular/core";
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ReduxService } from 'src/services/redux.service';

@Component({
  selector: "app-observation-thanks-dialog",
  templateUrl: "observation-thanks.component.html",
  styleUrls: ["observation-thanks.component.scss"],
})
export class ObservationThanksDialogComponent {

  constructor(public dialogRef: MatDialogRef<ObservationThanksDialogComponent>, private reduxService: ReduxService) { }

  onNoClick(): void {
    this.dialogRef.close();
    this.reduxService.resetObservation();
  }
}
