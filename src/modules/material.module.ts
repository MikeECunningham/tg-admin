/**Includes the material modules used in the application */

import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatNativeDateModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTabsModule } from "@angular/material/tabs";
import { NgModule } from "@angular/core";
import { MatSelectModule } from "@angular/material/select";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule, MatInput } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatRadioModule } from "@angular/material/radio";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { HttpClientModule } from "@angular/common/http";


@NgModule({
    imports: [HttpClientModule, MatButtonModule, MatCheckboxModule, MatSelectModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatCardModule, MatListModule, MatDialogModule, MatBottomSheetModule,
        MatInputModule, MatTabsModule, MatTableModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule, MatExpansionModule, MatProgressSpinnerModule, MatSlideToggleModule, MatStepperModule],
    exports: [MatButtonModule, MatCheckboxModule, MatSelectModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatCardModule, MatListModule, MatDialogModule, MatBottomSheetModule,
        MatInputModule, MatTabsModule, MatTableModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule, MatExpansionModule, MatProgressSpinnerModule, MatSlideToggleModule, MatStepperModule]
})
export class MaterialModule { }
