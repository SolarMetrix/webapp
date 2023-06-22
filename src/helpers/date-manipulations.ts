const _MS_PER_DAY = 1000 * 60 * 60 * 24;

export const dateDiffInDays = (firstDate: any, secondDate: any): number => {
  let utc1 = new Date(firstDate * 1000);
  let utc2 = new Date(secondDate * 1000);

  return Math.floor(
    (Date.UTC(utc2.getFullYear(), utc2.getMonth(), utc2.getDate()) -
      Date.UTC(utc1.getFullYear(), utc1.getMonth(), utc1.getDate())) /
      _MS_PER_DAY
  );
};

export const getMonthName = (monthInNumber: string): string => {
  switch (parseInt(monthInNumber)) {
    case 1:
      return "January";
    case 2:
      return "February";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    case 12:
      return "December";

    default:
      return "";
  }
};
