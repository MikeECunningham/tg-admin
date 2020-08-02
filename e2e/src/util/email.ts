/**
 * Wrapper for the ten minute mail library used for testing email functionality
**/

import { Subject } from "rxjs";
import * as request from "request";


export class EmailAddress {

    private address: Subject<string>;
    private mails: Subject<any[]>;
    private _address: string;
    private _mails: any[];

    constructor() {
        this.address = new Subject();
        this.mails = new Subject();

        // Setup the cookie jar to carry cookies
        const cj = request.jar();
        request("https://10minutemail.com/10MinuteMail/resources/session/address", { jar: cj }, (error, response, body) => {
            this.address.next(body);
            this._address = body;
            setInterval(() => {
                request("https://10minutemail.com/10MinuteMail/resources/messages/messagesAfter/0", { jar: cj }, (error, response, body) => {
                    let mails = JSON.parse(body);
                    if(!this._mails || mails.length != this._mails.length) {
                        this.mails.next(mails);
                        this._mails = mails;
                    }
                });
            }, 5000);
            setInterval(() => {
                request("https://10minutemail.com/10MinuteMail/resources/session/reset", { jar: cj }, () => { });
            }, 60000);
        });
    }

    /**
     * Returns the email address if it exists or waits for it to before returning it
     */
    async getAddress(): Promise<string> {
        return !!this._address ? this._address :
            await new Promise((r) => {
                const s = this.address.subscribe((v) => {
                    if (v) {
                        r(v);
                        s.unsubscribe();
                    }
                });
            });
    }

    /**
     * Gets the email in the inbox by the given id and if it doesnt exist
     * waits for it to before returning
     */
    async getMailByIndex(index): Promise<Email> {
        return !!this._mails && this._mails[index] ? this.mails[index] :
            await new Promise((r) => {
                const subscription = this.mails.subscribe((mails) => {
                    if (mails[index]) {
                        subscription.unsubscribe();
                        return r(mails[index]);
                    }
                });
            });
    }

    /**
     * Waits for a new email to show in the inbox and returns it.
     */
    async getNewMail(): Promise<Email> {
        return await new Promise((resolve) => {
            const s = this.mails.subscribe((v) => {
                if (!!v && v.length > 0) {
                    s.unsubscribe();
                    resolve(v[v.length-1]);
                }
            });
        });
    }

}
interface Email {
    subject: string;
    attachments: string[];
    repliedTo: boolean;
    bodyText: string;
}
