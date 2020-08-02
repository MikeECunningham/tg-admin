import { browser, by, element } from "protractor";
import { EmailAddress } from "../util/email";
import { TextInput, SelectInput, Button, RedirectButton } from "../util/elements";
import { ActivationEmail } from "../emails/activate.eo";
import { Page } from '../util/page';

export class SignupPage extends Page {

    email = new TextInput("emailTxt");
    firstName = new TextInput("firstNameTxt");
    lastName = new TextInput("lastNameTxt");
    password = new TextInput("passwordTxt");
    confirmPassword = new TextInput("confirmPasswordTxt");
    reference = new SelectInput("referenceSel");
    signupButton = new RedirectButton("signupButton");

    constructor(){ super("/signUp/"); }

    async fillForm(user: {email: string, firstName: string, lastName: string, password: string, confirmPassword: string, reference?: string}) {
        await this.email.fillTextField(user.email);
        await this.firstName.fillTextField(user.firstName);
        await this.lastName.fillTextField(user.lastName);
        await this.password.fillTextField(user.password);
        await this.confirmPassword.fillTextField(user.confirmPassword);
        if (!!user.reference) { await this.reference.selectOption(user.reference); }
    }

    async submitForm() {
        await this.signupButton.clickButton();
    }

    /**
     * Checks the inbox of the current mail and accepts the signup email
    **/
    async acceptSignupEmail(mail: EmailAddress) {
        const mailText = (await mail.getNewMail()).bodyText;
        await new ActivationEmail(mailText).activateEmail();
    }
}