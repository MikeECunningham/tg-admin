import { browser } from "protractor";
import { RedirectButton, By, TextInput, Element, Button, MatCheckboxInput, SelectInput, Image } from "../util/elements";
import { Page } from '../util/page';

export class MatchingGamePage extends Page {

    backButton = new Button("backButton");
    submitButton = new RedirectButton("submitButton");

    speciesList = [
        "blandings",
        "easternMusk",
        "midlandPainted",
        "northernMap",
        "red-earedSlider",
        "snapping",
        "spinySoftshell",
        "spotted",
        "wood",
        "westernPainted"
    ]

    constructor() { super("/matchingGame"); }

    async clickBackButton() { await this.backButton.clickButton(); }
    async clickNextButton(i) { await new Button(`nextButton${i}`).clickButton(); }
    async clickSubmitButton() { await this.submitButton.clickButton(); }
    async isClickSubmitBUttonDisplayed(): Promise<boolean> { return await this.submitButton.isDisplayed(); }
    async selectAnswerList(option: string, i) { await new SelectInput(`answerList${i}`).selectOptionBySelectId(option); }
    async getImage(index: number) { return new Image("testImage" + index).getSourceFilename(this.speciesList) }
    async selectCorrectAnswer(i) { await this.selectAnswerList(await this.getImage(i), i); }
}