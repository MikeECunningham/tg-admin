import { browser, by } from "protractor";
import { RedirectButton, TextInput, Element, Button } from "../../util/elements";

export class TestExplanationDialog {
    closeButton = new Button("closeButton");
    requestButton = new Button("requestButton");

    async clickCloseButton() { this.closeButton.clickButton(); }
    async clickRequestButton() { this.requestButton.clickButton(); }
}