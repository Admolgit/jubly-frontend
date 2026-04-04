export function formatDate(
  date?: Date | string,
  format: "YYYY-MM-DD" | "DD/MM/YYYY" | "MM-DD-YYYY" = "YYYY-MM-DD",
): string {
  if (!date) return "";

  const d = typeof date === "string" ? new Date(date) : date;

  if (isNaN(d.getTime())) return "";

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  switch (format) {
    case "YYYY-MM-DD":
      return `${year}-${month}-${day}`;
    case "DD/MM/YYYY":
      return `${day}/${month}/${year}`;
    case "MM-DD-YYYY":
      return `${month}-${day}-${year}`;
    default:
      return `${year}-${month}-${day}`;
  }
}
