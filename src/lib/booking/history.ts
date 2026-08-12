export function combineDateAndTime(dateStr: string, timeStr: string): Date {
  const [hours, minutes, seconds = "0"] = timeStr.split(":");
  const date = new Date(dateStr);
  date.setHours(Number(hours), Number(minutes), Number(seconds), 0);
  return date;
}
