import { browser, logging } from "protractor";
import { LoginPage } from "../components/login.po";
import { EmailAddress } from "../util/email";
import { ProfilePage } from "../components/profile.po";
import { ActivitiesPage } from "../components/activities.po";
import { MatchingGamePage } from "../components/matching-game.po";
import { TestPassedDialog } from "../components/dialogs/test-passed.do";
import { TestExplanationDialog } from "../components/dialogs/test-explanation.do";
import { ComponentActions } from '../util/component-actions';
import { MatCheckboxInput } from '../util/elements';

describe("Profile flow", async () => {
    const loginPage = new LoginPage();
    const profilePage = new ProfilePage();
    const email = new EmailAddress();
    const activitiesPage = new ActivitiesPage();
    const matchingGamePage = new MatchingGamePage();
    const testPassedDialog = new TestPassedDialog();
    const testExplanationDialog = new TestExplanationDialog();
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

    it("Should start the test and pass", async () => {
        await activitiesPage.navigateTo();
        await activitiesPage.clickTurtleTestButton();
        await testExplanationDialog.clickRequestButton();
        for(let i = 0;i<20;i++){
            await matchingGamePage.selectCorrectAnswer(i);
            if(i<19){ await matchingGamePage.clickNextButton(i);}
        }
        await matchingGamePage.clickSubmitButton();
        await testPassedDialog.fillEmailInput(user.email);
        await testPassedDialog.fillNameInput(user.firstName + " " + user.lastName);
        await testPassedDialog.fillAddressInput("123 ShellsAreSwell Avenue");
        await testPassedDialog.clickRequestButton();
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});