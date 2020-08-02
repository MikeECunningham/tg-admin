import { Component, Inject } from "@angular/core";
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-blocking-overlay-dialog",
  templateUrl: "blocking-overlay-dialog.component.html",
  styleUrls: ["blocking-overlay-dialog.component.scss"],
})
export class BlockingOverlayDialogComponent {

  constructor(public dialogRef: MatDialogRef<BlockingOverlayDialogComponent>) {}

  onNoClick(): void {
  }
}
