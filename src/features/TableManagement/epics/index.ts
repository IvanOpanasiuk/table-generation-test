import { combineEpics } from "redux-observable";
import { formSyncEpic } from "./formSyncEpic";

export const rootEpic = combineEpics(formSyncEpic);
