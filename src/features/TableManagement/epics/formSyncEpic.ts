import { ofType } from "redux-observable";
import { mergeMap } from "rxjs/operators";
import { AnyAction } from "@reduxjs/toolkit";

const FORM1_UPDATE_ACTION = "form1/update";
const FORM2_UPDATE_ACTION = "form2/update";

export const formSyncEpic = (action$: any) =>
  action$.pipe(
    ofType(FORM1_UPDATE_ACTION, FORM2_UPDATE_ACTION),
    mergeMap((action: AnyAction) => {
      if (action.type === FORM1_UPDATE_ACTION) {
        return [{ type: FORM2_UPDATE_ACTION, payload: action.payload }];
      } else if (action.type === FORM2_UPDATE_ACTION) {
        return [{ type: FORM1_UPDATE_ACTION, payload: action.payload }];
      }
      return [];
    }),
  );
