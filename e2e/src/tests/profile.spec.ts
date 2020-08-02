import { browser, logging } from "protractor";
import { LoginPage } from "../components/login.po";
import { SignupPage } from "../components/signup.po";
import { EmailAddress } from "../util/email";
import { ActivatePage } from "../components/activate.po";
import { ProfilePage } from "../components/profile.po";
import { ComponentActions } from '../util/component-actions';

describe("Profile flow", async () => {
    const loginPage = new LoginPage();
    const signupPage = new SignupPage();
    const activatePage = new ActivatePage();
    const profilePage = new ProfilePage();
    const email = new EmailAddress();
    var user: any;

    beforeAll(async () => {
        await browser.waitForAngularEnabled(true);
        await loginPage.navigateTo();
        user = await ((new ComponentActions()).createUser(email));
    });

    beforeEach(async () => {
        await browser.waitForAngularEnabled(true);
        await loginPage.navigateTo();
    });

    it("Should log out from profile", async () => {
        await profilePage.navigateTo();
        await profilePage.clickLogoutButton();
    });

    it("Should log in from profile page", async () => {
        await profilePage.navigateTo();
        await profilePage.clickLoginButton();
        await loginPage.fillForm(user);
        await loginPage.clickLoginButton();
        
    });

    it("Should enter edit mode and then cancel", async () => {
        await profilePage.navigateTo();
        await profilePage.clickEditProfileButton();
        await profilePage.clickCancelEditModeButton();
    });

    it("Should enter edit mode and then save without changes", async () => {
        await profilePage.navigateTo();
        await profilePage.clickEditProfileButton();
        await profilePage.clickEditProfileButton();
    });

    it("Should enter edit mode, submit blank name fields, and experience no change", async () => {
        await profilePage.navigateTo();
        await profilePage.clickEditProfileButton();
        await profilePage.fillFirstNameText("");
        await profilePage.fillLastNameText("");
        await profilePage.clickEditProfileButton();
        await profilePage.clickEditProfileButton();
        expect(await profilePage.getFirstNameText()).toBe(user.firstName);
        expect(await profilePage.getLastNameText()).toBe(user.lastName);
        await profilePage.clickCancelEditModeButton();
    });

    it("Should edit the profile", async () => {
        await profilePage.navigateTo();
        await profilePage.clickEditProfileButton();
        user.firstName += "aaa";
        user.lastName += "bbb";
        await profilePage.fillFirstNameText(user.firstName);
        await profilePage.fillLastNameText(user.lastName);
        await profilePage.clickEditProfileButton();
        await profilePage.clickEditProfileButton();
        expect(await profilePage.getFirstNameText()).toBe(user.firstName);
        expect(await profilePage.getLastNameText()).toBe(user.lastName);
        await profilePage.clickCancelEditModeButton();
    });

    it("", async () => {
        
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});