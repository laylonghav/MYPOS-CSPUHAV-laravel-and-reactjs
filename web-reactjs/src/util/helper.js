import dayjs from "dayjs";
import { profileStore } from "../store/profileStore";

export const dateClient = (date, format = "DD/MM/YYYY") => {
  if (date) {
    // "DD/MM/YYYY h:m a"
    return dayjs(date).format(format);
  }
  return null;
};

export const dateServer = (date, format = "YYYY-MM-DD") => {
  if (date) {
    // "DD/MM/YYYY h:m a"
    return dayjs(date).format(format);
  }
  return null;
};

export const isPermission = (permission_name) => {
  const { permission } = profileStore.getState();
  if (permission) {
    let findIndex = permission?.findIndex(
      (item) => item.name === permission_name
    );
    if (findIndex == -1) {
      return false;
    }
    return true;
  }
};
