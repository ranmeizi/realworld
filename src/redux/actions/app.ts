import * as ACTION_TYPES from "../ACTION_TYPES";
import { themeChange } from "@/theme/useThemeStyle";
import { User } from "@/services/User";

// 设置皮肤
export function setTheme(theme: "light" | "dark") {
  document.body.className = "rvt-body-" + theme;
  themeChange(theme);
  return {
    type: ACTION_TYPES.SET_THEME,
    data: theme,
  };
}

// 存放user信息
export function setUinfo(uinfo: User) {
  return {
    type: ACTION_TYPES.SET_UINFO,
    data: uinfo,
  };
}

// 清空user信息 退出登陆
export function clearUinfo() {
  return {
    type: ACTION_TYPES.CLEAR_UINFO,
  };
}

export function setPermission(permissionList: string[]) {
  return {
    type: ACTION_TYPES.SET_PERMISSION,
    data: permissionList,
  };
}
