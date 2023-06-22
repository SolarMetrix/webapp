import { getMonthName } from "./date-manipulations";

export default function formatDate(
  date: string,
  includeYear: boolean = false
): string {
  const dateParts = date.split("-");
  const day = dateParts[2];
  const month = getMonthName(dateParts[1]!);
  const year = dateParts[0];

  if (includeYear) {
    return `${month} ${parseInt(day!)}, ${year}`;
  }

  return `${month} ${parseInt(day!)}`;
}
