import { FORM1_UPDATE_ACTION, FORM2_UPDATE_ACTION } from './actionTypes';

interface FormUpdateAction {
    type: typeof FORM1_UPDATE_ACTION | typeof FORM2_UPDATE_ACTION;
    payload: any;
}

export type AppAction = FormUpdateAction;
