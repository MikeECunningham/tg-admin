import * as request from "request";
import { JSDOM } from "jsdom";
/**
 * Represents an activation email object
**/
export class ActivationEmail {

    activationLink: string;

    constructor(email: string) {
        const dom = new JSDOM(email);
        this.activationLink = dom.window.document.getElementById("activationLink").getAttribute("href");
    }

    async activateEmail() {
        return await new Promise((resolve) => {
            request(this.activationLink, () => resolve());
        });
    }
}
