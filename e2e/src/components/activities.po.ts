import { browser, by } from "protractor";
import { RedirectButton, TextInput, Element, Button, MatCheckboxInput, SelectInput, Image } from "../util/elements";
import { Page } from '../util/page';

export class ActivitiesPage extends Page {
    turtleTestButton = new RedirectButton("turtleTestButton");
    constructor() { super("/menu/2"); }
    async clickTurtleTestButton() { this.turtleTestButton.clickButton(); }
}