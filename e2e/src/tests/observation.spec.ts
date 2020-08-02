import { browser, logging } from "protractor";
import { LoginPage } from "../components/login.po";
import { SignupPage } from "../components/signup.po";
import { EmailAddress } from "../util/email";
import { ActivatePage } from "../components/activate.po";
import { ProfilePage } from "../components/profile.po";
import { ComponentActions } from '../util/component-actions';
import { ObservationPage } from '../components/observation.po';
import { NewObservationPage } from '../components/new-observation.po';

describe("Profile flow", async () => {
    const loginPage = new LoginPage();
    const signupPage = new SignupPage();
    const activatePage = new ActivatePage();
    const profilePage = new ProfilePage();
    const observations = new ObservationPage();
    const newObservations = new NewObservationPage();
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

    it("Should create an observation", async () => {
        await observations.navigateTo();
        await observations.clickAddObservationButton();

        //await newObservations.chooseSpeciesSelectorDropdown("Northern Map Turtle");
        await newObservations.clickNextButton()

        await newObservations.clickCamIconButton();
        await newObservations.clickTakeImageButton();
        await newObservations.clickNextButton();

        await newObservations.clickCamIconButton();
        await newObservations.clickTakeImageButton();
        await newObservations.clickNextButton();

        //await newObservations.chooseBehaviorSelectorDropdown("Nesting");
        await newObservations.clickNextButton();

        //await newObservations.chooseHabitatSelectorDropdown("River");
        await newObservations.clickNextButton();

        //await newObservations.clickSubmitButton();
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});