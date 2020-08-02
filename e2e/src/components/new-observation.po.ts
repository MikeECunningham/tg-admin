import { browser, by } from "protractor";
import { RedirectButton, Camera, Element, Button, MatCheckboxInput, SelectInput } from "../util/elements";
import { Page } from '../util/page';

export class NewObservationPage extends Page {

    speciesSelectorDropdown = new SelectInput("speciesSelectorDropdown");
    behaviorSelectorDropdown = new SelectInput("behaviorDropdown");
    habitatSelectorDropdown = new SelectInput("habitatDropdown");
    nextButton = new RedirectButton("nextButton");
    backButton = new RedirectButton("backButton");
    submitButton = new RedirectButton("submitButton");
    takeImageButton = new Button("takeImage");
    uploadImageButton = new Button("uploadImage");
    camIconButton = new Button("camIcon");
    cameraElement = new Camera("//android.widget.FrameLayout//android.widget.TextView[@text='Camera']", "XPATH");

    constructor() { super("newObservation"); }

    async chooseSpeciesSelectorDropdown(species: string) { await this.speciesSelectorDropdown.selectOption(species); }
    async chooseBehaviorSelectorDropdown(behavior: string) { await this.behaviorSelectorDropdown.selectOption(behavior); }
    async chooseHabitatSelectorDropdown(habitat: string) { await this.habitatSelectorDropdown.selectOption(habitat); }
    async clickNextButton() { await this.nextButton.clickButton(); }
    async clickBackButton() { await this.backButton.clickButton(); }
    async clickSubmitButton() { await this.submitButton.clickButton(); }
    async clickTakeImageButton() { await this.takeImageButton.clickButton(); }
    async clickUploadImageButton() { await this.uploadImageButton.clickButton(); }
    async clickCamIconButton() { await this.camIconButton.clickButton(); }

    async clickCameraElement() { await this.cameraElement.click(); }
}