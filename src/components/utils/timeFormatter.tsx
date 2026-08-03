export function formatTimeFromISO(isoString: string) {
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function addMinutesToTime(time: string, minutesToAdd: number) {
  if (!time || !minutesToAdd) return time;

  const [hours, minutes] = time.split(":").map(Number);
  const totalMinutes = (hours * 60 + minutes + minutesToAdd + 1440) % 1440;
  const newHours = Math.floor(totalMinutes / 60);
  const newMinutes = totalMinutes % 60;

  return `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(2, "0")}`;
}
