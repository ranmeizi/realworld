import { AnyAction } from "redux";
import * as TYPES from "../ACTION_TYPES";

type UInfo = {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
};

type AppState = {
  theme: "light" | "dark";
  appTab: string;
  hideTabbar: boolean;
  hideHeader: boolean;
  uinfo: Partial<UInfo>;
  permission: string[];
};

const initialState: AppState = {
  theme: "dark",
  appTab: "",
  hideTabbar: false,
  hideHeader: false,
  uinfo: {},
  permission: [],
};

export default function reducer(
  state: AppState = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case TYPES.SET_THEME:
      return {
        ...state,
        theme: action.data,
      };
    case TYPES.SET_UINFO:
      return {
        ...state,
        uinfo: action.data,
      };
    case TYPES.CLEAR_UINFO:
      return {
        ...state,
        uinfo: {},
      };
    case TYPES.SET_PERMISSION:
      return {
        ...state,
        permission: action.data,
      };
    default:
      return state;
  }
}
