import * as request from "request";
import { JSDOM } from "jsdom";
/**
 * Represents an activation email object
**/
export class ResetEmail {

    resetLink: string;

    constructor(email: string) {
        const dom = new JSDOM(email);
        this.resetLink = dom.window.document.getElementById("resetLink").getAttribute("href");
    }

    async getResetUrl() {
        return this.resetLink;
    }
}