import { IAction } from "./actions";

export const ACTION_GUIDE_CHANGE = "ACTION_GUIDE_CHANGE";

export function guideChangeAction(page: string): IAction {
    return { type: ACTION_GUIDE_CHANGE, payload: page };
}
