import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { NgRedux, select } from "@angular-redux/store";
import { IAppState } from "src/store/store";
import { Observable } from "rxjs";
import { ILoginState } from "src/store/reducers/loginReducer";
import { RestService } from "src/services/rest.service";
import { IObservationsState } from "src/store/reducers/observationsReducer";
import { observationResetAction } from "src/store/actions/newObservationActions";

@Component({
  selector: "app-observations",
  templateUrl: "./observations.component.html",
  styleUrls: ["./observations.component.scss"]
})
export class ObservationsComponent implements OnInit {

  @select() login: Observable<ILoginState>;
  @select() observations: Observable<IObservationsState>;

  @ViewChild("fab", {static: false}) fab: ElementRef;

  nameMap = {
    BNTU: "Blanding's Turtle",
    STIN: "Eastern Musk Turtle",
    MPTU: "Midland Painted Turtle",
    MATU: "Northern Map Turtle",
    RSTU: "Red-eared Slider Turtle",
    SNTU: "Snapping Turtle",
    SSTU: "Spiny Softshell Turtle",
    SPTU: "Spotted Turtle",
    WPTU: "Western Painted Turtle",
    WOTU: "Wood Turtle",
    UNKN: "Other"
  };

  behaviorMap = {
    BASK: "Basking",
    SWIM: "Swimming",
    CROS: "Crossing Road",
    INJU: "Injured",
    NEST: "Nesting",
    DEAD: "Dead"
  };

  constructor(private router: Router, private ngRedux: NgRedux<IAppState>, private restService: RestService) { }

  async ngOnInit() {
    //this.observations.subscribe((val)=>console.dir(val.observations));
    this.restService.getObservations();
  }

  addObservation() {
    this.ngRedux.dispatch(observationResetAction());
    this.router.navigate(["newObservation"]);
  }

  reloadObservations() {
    this.restService.getObservations();
  }

  loginPage() {
    this.router.navigate([""]);
  }
}
