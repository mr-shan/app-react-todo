export const dateToString = date => {
  try {
    date = typeof date === "string" ? new Date(date) : date;
    let month = date.getMonth() + 1;
    month = month.toString();
    month = month.length === 1 ? "0" + month : month;
    return `${date.getDate()}/${month}/${date.getFullYear()}`;
  } catch (error) {
      return 'Click here to set due date';
  }
};
