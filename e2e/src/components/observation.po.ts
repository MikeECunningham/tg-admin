import { browser, by } from "protractor";
import { RedirectButton, TextInput, Element, Button } from "../util/elements";
import { Page } from '../util/page';

export class ObservationPage extends Page {
    addObservationButton = new Button("addObservationButton");

    constructor() { super("menu/1"); }

    async clickAddObservationButton() { await this.addObservationButton.clickButton(); }
}