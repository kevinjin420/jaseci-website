export function dateFormat(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "America/New_York",
  });
}
