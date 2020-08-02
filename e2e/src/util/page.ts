import { browser, by, element } from "protractor";

const log = (val)=>console.log(`[DEBUG] ${val}`);

export class Page{
    
    private url;

    constructor(url){ this.url = url; }

    async navigateTo(){
        log(`Navigating To page ${this.url}`)
        await browser.get(this.url);
        log(`Waiting for angular on page ${this.url}`)
        // Needed to wait for the page to load
        await browser.waitForAngular();
        log(`Waiting for 2 on browser page ${this.url}`)
        await browser.sleep(2000);
        log(`Waited for 2 on browser page ${this.url}`)
    }
}