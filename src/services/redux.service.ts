import { Injectable } from "@angular/core";
import { NgRedux} from "@angular-redux/store";
import { IAppState } from "src/store/store";
import { StoreDataService } from "./store-data.service";
import { guideChangeAction } from "src/store/actions/guideActions";
import { observationChangeAction, observationResetAction, observationUpdateAction } from "src/store/actions/newObservationActions";
@Injectable()
export class ReduxService {

    constructor(private ngRedux: NgRedux<IAppState>, private storeDataService: StoreDataService) {}

    changeGuidePage(page: string): void {
        this.ngRedux.dispatch(guideChangeAction(page));
    }

    resetObservation(): void {
        this.ngRedux.dispatch(observationResetAction());
    }

    changeObservationPage(page: string): void {
        this.ngRedux.dispatch(observationChangeAction(page));
    }
}
