import { browser, by } from "protractor";
import { RedirectButton, TextInput, Element, Button, CheckboxInput } from "../util/elements";
import { ResetEmail } from "../emails/reset.eo";
import { EmailAddress } from "../util/email";
import { Page } from '../util/page';

export class PasswordPage extends Page{

    backButton = new RedirectButton("menuButton");
    sendResetButton = new Button("sendButton");
    emailResetText = new TextInput("emailResetText");

    async clickBackButton() { await this.backButton.clickButton(); }
    async clickSendResetButton() { await this.sendResetButton.clickButton(); }
    async fillEmailResetText(email: string) { await this.emailResetText.fillTextField(email); }

    constructor(){ super("password"); }

    async sendResetPassword(email: string) {
        await this.fillEmailResetText(email);
        await this.clickSendResetButton();
    }

    async getResetPasswordUrl(mail: EmailAddress) {
        const mailText = (await mail.getNewMail()).bodyText;
        return await new ResetEmail(mailText).getResetUrl();
    }
}