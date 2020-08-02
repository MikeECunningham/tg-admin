import { Component, OnInit, OnDestroy } from "@angular/core";
import { RestService } from "src/services/rest.service";
import { select } from "@angular-redux/store";
import { Observable, Subscription } from "rxjs";
import { ObservationThanksDialogComponent } from "../dialogs/observation-thanks/observation-thanks.component";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { MatDialog } from "@angular/material/dialog";
import { IObservationState } from "src/store/reducers/newObservationReducer";
import { ReduxService } from "src/services/redux.service";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { Camera } from '@ionic-native/camera/ngx';
import { TranslateService } from '@ngx-translate/core';
import imageData from './testImage';

declare var navigator: any;

@Component({
    selector: "app-new-observation",
    templateUrl: "./new-observation.component.html",
    styleUrls: ["./new-observation.component.scss"]
})
export class NewObservationComponent implements OnInit, OnDestroy {

    @select() newObservation: Observable<IObservationState>;
    newObservationState: IObservationState;
    private observationSubscription: Subscription;
    private attachSubscription: Subscription;
    watchingGPS: boolean;
    watchID: number;

    carapaceImage: Buffer;
    carapaceImageUrl: SafeResourceUrl;
    plastronImage: Buffer;
    plastronImageUrl: SafeResourceUrl;
    species: string;
    behavior: string;
    habitat: string;
    latitude: number;
    longitude: number;
    accuracy: number;

    previousSubmissions = "";
    otherSubmissions = "";

    routeSubscription: Subscription;

    speciesList = {
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

    behaviorList = {
        BASK: "Basking",
        SWIM: "Swimming",
        CROS: "Crossing Road",
        INJU: "Injured",
        NEST: "Nesting",
        DEAD: "Dead"
    };

    habitatList = {
        RIVER: "River",
        LAKE: "Lake",
        WETLAND: "Wetland",
        ROCKBAREN: "Rock Barren",
        OPEN: "Open area",
        FOREST: "Forest",
        ROAD: "Road",
        ROADSHOULDER: "Shoulder Of Road"
    };
    constructor(private restService: RestService, private router: Router, private dialog: MatDialog, private bottomSheet: MatBottomSheet,
        private reduxService: ReduxService, private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute,
        private camera: Camera, private translateService: TranslateService) {
        this.routeSubscription = this.activatedRoute.params.subscribe(async (params) => {
            this.species = params.species;
        });
    }

    submit() {
        const observation = {
            species: this.species,
            behavior: this.behavior,
            habitat: this.habitat,
            lat: Number(this.latitude) || 0,
            long: Number(this.longitude) || 0,
            acc: Number(this.accuracy) || 0,
            carapaceImage: this.carapaceImage,
            plastronImage: this.plastronImage,
            previousSubmissions: this.previousSubmissions == "Other" ? this.otherSubmissions : this.previousSubmissions
        };
        this.restService.submitObservation(observation);
    }

    goBack() {
        switch (this.newObservationState.page) {
            case "species":
                if (window.confirm(this.translateService.instant("Are you sure you want to discard your observation?"))) {
                    this.reduxService.resetObservation();
                    this.router.navigate(["menu"]);
                }
                break;
            case "image1":
                this.reduxService.changeObservationPage("species");
                break;
            case "image2": this.reduxService.changeObservationPage("image1");
                break;
            case "behavior": this.reduxService.changeObservationPage("image2");
                break;
            case "habitat": this.reduxService.changeObservationPage("behavior");
                break;
            case "submit": this.reduxService.changeObservationPage("habitat");
                break;
        }
    }

    ngOnInit() {
        // Redirect to the menu page when the user is logged in
        this.observationSubscription = this.newObservation.subscribe((val) => {
            this.newObservationState = val;
            if (val.submittedObservation) {
                // Redirect and show happy waving turtle
                this.router.navigate(["menu"]);
                this.dialog.open(ObservationThanksDialogComponent, {
                    width: "350px",
                    height: "200px"
                });
            }
        });
        navigator.geolocation.getCurrentPosition(() => {
            this.queryLocation();
        }, () => {
            // Error scope triggered if location services isnt enabled
            alert(this.translateService.instant("Your device has location services disabled. Please enable it in your device settings to submit a sighting."));
            this.router.navigate(["menu"]);
        });

    }

    nextPage() {
        switch (this.newObservationState.page) {
            case "species": this.reduxService.changeObservationPage("image1");
                break;
            case "image1": this.reduxService.changeObservationPage("image2");
                break;
            case "image2": this.reduxService.changeObservationPage("behavior");
                break;
            case "behavior": this.reduxService.changeObservationPage("habitat");
                break;
            case "habitat": this.reduxService.changeObservationPage("submit");
                break;
        }
    }

    requestCarapaceImage() {
        this.takeCarapaceImage();
    }

    requestPlastronImage() {
        this.takePlastronImage();
    }

    async takeCarapaceImage() {
        const options = {
            destinationType: this.camera.DestinationType.DATA_URL,
            direction: this.camera.Direction.FRONT
        };
        try {
            // Gets the image data from cordova camera as a base 64 encoded string
            let imageData = (await this.camera.getPicture(options)) as string;
            this.carapaceImageUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64,${imageData}`);
            this.carapaceImage = Buffer.from(imageData, 'base64');
        } catch (err) {
            this.carapaceImageUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64,${imageData}`);
            this.carapaceImage = Buffer.from(imageData, 'base64');
            console.error(`Image error: ${err}`);
        }
    }

    async takePlastronImage() {
        const options = {
            destinationType: this.camera.DestinationType.DATA_URL,
            direction: this.camera.Direction.FRONT
        };
        try {
            // Gets the image data from cordova camera as a base 64 encoded string
            let imageData = (await this.camera.getPicture(options)) as string;
            this.plastronImageUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64,${imageData}`);
            this.plastronImage = Buffer.from(imageData, 'base64');
        } catch (err) {
            this.plastronImageUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64,${imageData}`);
            this.plastronImage = Buffer.from(imageData, 'base64');
            console.error(`Image error: ${err}`);
        }
    }

    ngOnDestroy() {
        // Destroy the observations subscription to prevent any strange behavior
        if (this.observationSubscription) { this.observationSubscription.unsubscribe(); }
        if (this.attachSubscription) { this.attachSubscription.unsubscribe(); }
        this.routeSubscription.unsubscribe();
        this.setWatchingGPS(false);
    }

    setWatchingGPS(val: boolean) {
        if (this.watchingGPS) { navigator.geolocation.clearWatch(this.watchID); }
        this.watchingGPS = val;
    }
    queryLocation() {
        if (navigator.geolocation) {
            this.setWatchingGPS(true);
            this.latitude = null;
            this.longitude = null;
            this.accuracy = null;
            this.watchID = navigator.geolocation.watchPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.accuracy = position.coords.accuracy;
                if (this.accuracy <= 3 && this.newObservationState.page !== "submit") { this.setWatchingGPS(false); }
            }, (e) => { alert(`GPS error occured. For help, report this to the app support: ${JSON.stringify(e)}`); this.setWatchingGPS(false); },
                {
                    enableHighAccuracy: true,
                    maximumAge: 0
                });
        } else {
            alert("Geolocation is not supported by this device. Please contact the app developers.");
        }
    }
}