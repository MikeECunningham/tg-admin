import { element, by, browser, ExpectedConditions } from "protractor";


export enum By {
    ID='ID',
    CLASS='CLASS',
    NAME='NAME',
    XPATH='XPATH',
    TAG='TAG',
    TEXT='TEXT',
    VALUE='VALUE',
    CSS='CSS',
    LINKTEXT='LINKTEXT'
}

const log = (val)=>console.log(`[DEBUG] ${val}`);

/**
 * Wrapper for protractor elements to automatically handle staleness and common functionality.
 * Extend this if more functionality is needed.
**/
export class Element {
    /** The identifier this element is referenced by */
    protected id: string;
    /** The way the element is found in the DOM */
    protected by: By;

    constructor(id, by?) {
        this.id = id;
        this.by = by || By.ID;
    }

    get element() {
        switch (this.by) {
            case By.ID:
                return element(by.id(this.id));
            case By.CLASS:
                return element(by.className(this.id));
            case By.NAME:
                return element(by.name(this.id));
            case By.XPATH:
                return element(by.xpath(this.id));
            case By.TAG:
                return element(by.tagName(this.id));
            case By.CSS:
                return element(by.css(this.id));
            case By.LINKTEXT:
                return element(by.linkText(this.id));
            default:
                throw Error(`Cannot get element by ${this.by}`);
        }
    }

    async isDisplayed(): Promise<boolean> {
        log(`Getting Displayed Status from Element with ${this.by} "${this.id}"`);
        await browser.wait(ExpectedConditions.not(ExpectedConditions.stalenessOf(this.element)));
        return await this.element.isDisplayed();
    }

    async getText(): Promise<string> {
        log(`Getting Displayed Status from Element with ${this.by} "${this.id}"`);
        await browser.wait(ExpectedConditions.not(ExpectedConditions.stalenessOf(this.element)));
        return await this.element.getText();
    }

    async isEnabled(): Promise<boolean> {
        log(`Getting Displayed Status from Element with ${this.by} "${this.id}"`);
        await browser.wait(ExpectedConditions.not(ExpectedConditions.stalenessOf(this.element)));
        return await this.element.getAttribute("disabled") == "false";
    }
}

export class TextInput extends Element {

    /**
     * Fills the text field with the given value
    **/
    async fillTextField(value) {
        log(`Setting Text Field with ${this.by} "${this.id}" to value ${value}`);
        await browser.wait(ExpectedConditions.not(ExpectedConditions.stalenessOf(this.element)));
        await this.element.clear();
        await this.element.sendKeys(value);
        await browser.waitForAngular();
        log(`Set Text Field with ${this.by} "${this.id}" to value ${value}`);
    }

    /**
     * Retrieves the current elements 
    **/
    async getText(): Promise<string> {
        log(`Getting Text from Field with ${this.by} "${this.id}"`);
        await browser.wait(ExpectedConditions.not(ExpectedConditions.stalenessOf(this.element)));
        return await this.element.getAttribute("value");
    }
}

export class SelectInput extends Element {

    /**
     * Selects the given option
     * @param value The value to select the option by
     */
    async selectOptionBySelectId(value) {
        log(`Setting Select with ${this.by} "${this.id}" to value ${value}`);
        await browser.wait(ExpectedConditions.not(ExpectedConditions.stalenessOf(this.element)));
        await this.element.element(by.xpath(`//select[@id="${this.id}"]/*[@value="${value}"]`)).click();
        await browser.waitForAngular();
        log(`Set Select with ${this.by} "${this.id}" to value ${value}`);
    }

    /**
     * Selects the given option
     * @param value The text to select the option by
     */
    async selectOption(value) {
        log(`Setting Select with ${this.by} "${this.id}" to text ${value}`);
        await browser.wait(ExpectedConditions.not(ExpectedConditions.stalenessOf(this.element)));
        await this.element.element(by.xpath(`//*[text()="${value}"]`)).click();
        await browser.waitForAngular();
        log(`Set Select with ${this.by} "${this.id}" to text ${value}`);
    }

    /**
     * Selects the given option with the prefered value
     * @param value The value to select the option by
     * @by The method to select the option by (TEXT, VALUE)
     */
    async selectOptionByValue(value) {
        log(`Setting Select with ${this.by} "${this.id}" to value ${value}`);
        await browser.wait(ExpectedConditions.not(ExpectedConditions.stalenessOf(this.element)));
        await this.element.element(by.xpath(`//*[@value="${value}"]`)).click();
        await browser.waitForAngular();
        log(`Set Select with ${this.by} "${this.id}" to value ${value}`);
    }
}

export class CheckboxInput extends Element {
    async clickCheckbox() {
        log(`Clicking checkbox with ${this.by} "${this.id}"`);
        await browser.wait(ExpectedConditions.not(ExpectedConditions.stalenessOf(this.element)));
        await this.element.click();
        await browser.waitForAngular();
        log(`Clicked checkbox with ${this.by} "${this.id}"`);
    }

    async isChecked(): Promise<boolean> {
        log(`Getting Checked Status from Element with ${this.by} "${this.id}"`);
        await browser.wait(ExpectedConditions.not(ExpectedConditions.stalenessOf(this.element)));
        log ("Checkbox getAttribute = " + await this.element.getAttribute("class"));
        return await (await this.element.isSelected());
    }
}

export class Camera extends Element {
    async click() {
        log(`Getting Attribute with ${this.by} "${this.id}"`);
        await browser.wait(ExpectedConditions.not(ExpectedConditions.stalenessOf(this.element)));
        await this.element.click();
    }
}

export class MatCheckboxInput extends CheckboxInput {
    async isChecked(): Promise<boolean> {
        log(`Getting Checked Status from Element with ${this.by} "${this.id}"`);
        await browser.wait(ExpectedConditions.not(ExpectedConditions.stalenessOf(this.element)));
        log ("Checkbox getAttribute = " + await this.element.getAttribute("class"));
        return await (await this.element.getAttribute("class")).includes("mat-checkbox-checked");
    }
}

export class Button extends Element {

    async clickButton() {
        log(`Clicking button with ${this.by} "${this.id}"`);
        await browser.wait(ExpectedConditions.not(ExpectedConditions.stalenessOf(this.element)));
        await this.element.click();
        await browser.waitForAngular();
        log(`Clicked button with ${this.by} "${this.id}"`);
    }
}

/**
 * Represents a button that will redirect the page after it is clicked.
 */
export class RedirectButton extends Element {

    async clickButton() {
        log(`Clicking button with ${this.by} "${this.id}"`);
        await browser.wait(ExpectedConditions.not(ExpectedConditions.stalenessOf(this.element)));
        await this.element.click();
        await browser.waitForAngular();
        log(`Clicked button with ${this.by} "${this.id}"`);
    }
}

/** Represents an Image that can be checked against its filename */
export class Image extends Element {
    async getSourceFilename(filenames: string[]): Promise<string> {
        log(`Getting image with ${this.by} "${this.id}"`);
        await browser.wait(ExpectedConditions.not(ExpectedConditions.stalenessOf(this.element)));
        const str = await this.element.getAttribute("src")
        log(`Got image with ${this.by} "${this.id}"`);
        return filenames.find((element) => str.includes(element));
    }
}
