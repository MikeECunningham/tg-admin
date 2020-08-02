import { browser, by } from "protractor";
import { RedirectButton, TextInput, Element } from "../util/elements";
import { Page } from '../util/page';

export class ActivatePage extends Page{

    loginButton = new RedirectButton("loginButton");
    sendButton = new RedirectButton("sendButton");
    backButton = new RedirectButton("backButton");
    pageDiv = new Element("activationPageDiv");

    constructor(){ super("/activate"); }

    async clickSendButton() {
        await this.sendButton.clickButton();
    }

    async clickLoginButton() {
        await this.loginButton.clickButton();
    }

    async clickBackButton() {
        await this.backButton.clickButton();
    }

    /** Returns true if a persistent title element on the page is displayed */
    async checkPage() {
        return await this.pageDiv.isDisplayed();
    }
}