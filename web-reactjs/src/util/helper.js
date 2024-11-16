import dayjs from "dayjs";

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
