import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { RestService } from "src/services/rest.service";
import { IAppState } from "src/store/store";
import { MatDialog } from "@angular/material/dialog";
import { TestPassedDialogComponent } from "../dialogs/test-passed/test-passed.component";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { NgRedux } from "@angular-redux/store";
import { profilePassTest } from "src/store/actions/profileActions";
import { StoreDataService } from "src/services/store-data.service";
import { TestExplanationDialogComponent } from "../dialogs/test-explanation/test-explanation.component";
import { TranslateService } from '@ngx-translate/core';
import pages from "../guide/pages";

declare var Camera: any;
declare var navigator: any;
declare var window: any;
declare var cordova: any;

@Component({
    selector: "app-matching-game",
    templateUrl: "./matching-game.component.html",
    styleUrls: ["./matching-game.component.scss"],
    animations: [
        trigger("slide", [
            state("0", style({ transform: "translateX(0)" })),
            state("1", style({ transform: "translateX(-5%)" })),
            state("2", style({ transform: "translateX(-10%)" })),
            state("3", style({ transform: "translateX(-15%)" })),
            state("4", style({ transform: "translateX(-20%)" })),
            state("5", style({ transform: "translateX(-25%)" })),
            state("6", style({ transform: "translateX(-30%)" })),
            state("7", style({ transform: "translateX(-35%)" })),
            state("8", style({ transform: "translateX(-40%)" })),
            state("9", style({ transform: "translateX(-45%)" })),
            state("10", style({ transform: "translateX(-50%)" })),
            state("11", style({ transform: "translateX(-55%)" })),
            state("12", style({ transform: "translateX(-60%)" })),
            state("13", style({ transform: "translateX(-65%)" })),
            state("14", style({ transform: "translateX(-70%)" })),
            state("15", style({ transform: "translateX(-75%)" })),
            state("16", style({ transform: "translateX(-80%)" })),
            state("17", style({ transform: "translateX(-85%)" })),
            state("18", style({ transform: "translateX(-90%)" })),
            state("19", style({ transform: "translateX(-95%)" })),
            transition("* => *", animate(300))
        ])
    ]
})
export class MatchingGameComponent implements OnInit, OnDestroy {

    speciesList = {
        blandings: "Blanding's Turtle",
        easternMusk: "Eastern Musk Turtle",
        midlandPainted: "Midland Painted Turtle",
        northernMap: "Northern Map Turtle",
        "red-earedSlider": "Red-eared Slider Turtle",
        snapping: "Snapping Turtle",
        spinySoftshell: "Spiny Softshell Turtle",
        spotted: "Spotted Turtle",
        wood: "Wood Turtle",
        westernPainted: "Western Painted Turtle"
    };

    activePane = "0";

    // The translation string for the question progress
    questionString(translateParam) {
        return this.translateService.instant("Question {{questionNumber}} of 20", translateParam);
    };

    testList = [];
    answerList = [];

    constructor(
        private restService: RestService,
        private router: Router,
        private dialog: MatDialog,
        private ngRedux: NgRedux<IAppState>,
        private storageService: StoreDataService,
        private translateService: TranslateService
    ) {
        const testListi = [];
        function getCredits(speciesName: string, imageIndex: number): string {
            for (let page of pages) {
                if (speciesName == page.speciesName) {
                    return page.imageCredits[imageIndex];
                }
            }
            return "ERROR";
        }
        for (const i of Object.keys(this.speciesList)) {
            let cred = [getCredits(this.speciesList[i], 0), getCredits(this.speciesList[i], 1)]
            const obj: any = { index: 1, name: i, credit: cred[0] };
            const obj2: any = { index: 2, name: i, credit: cred[1] };
            testListi.push(obj);
            testListi.push(obj2);
        }
        for (let i = testListi.length; i > 0; i--) {
            const choice = Math.floor(Math.random() * i);
            this.testList.push(testListi[choice]);
            testListi.splice(choice, 1);
            this.answerList.push("");
        }
    }

    async submit() {
        let numCorrect = 0;
        for (let i = 0; i < this.testList.length; i++) {
            if (this.testList[i].name === this.answerList[i]) { numCorrect++; }
        }
        if (numCorrect / this.testList.length > 0.75) {
            await this.restService.sendTestPass();
            this.ngRedux.dispatch(profilePassTest());
            this.storageService.setTestPassed();
            this.dialog.open(TestPassedDialogComponent, {
                width: "350px",
                height: "475px"
            });
        } else {
            alert(
                this.translateService.instant(
                    "You got {{numCorrect}} correct out of {{numQuestions}}. You did not pass :(",
                    { numCorrect, numQuestions: this.testList.length }
                )
            );
        }
        this.router.navigate(["/menu"]);
    }

    ngOnInit() {
        this.dialog.open(TestExplanationDialogComponent, {
            width: "350px",
            height: "300px"
        });
    }

    nextPage() {
        this.activePane = (Number(this.activePane) + 1).toString();
    }

    ngOnDestroy() {

    }

    goBack() {
        if (confirm(this.translateService.instant("Are you sure you want to quit the test?"))) { this.router.navigate(["menu"]); }
    }

}
