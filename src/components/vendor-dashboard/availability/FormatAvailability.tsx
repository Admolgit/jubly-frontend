const dayNames: Record<number, string> = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

function formatTime(time: string) {
  const [hour, minute] = time.split(":").map(Number);

  const suffix = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;

  return `${formattedHour}:${minute.toString().padStart(2, "0")} ${suffix}`;
}

export function formatGroupedAvailability(
  grouped: Record<
    number,
    {
      startTime: string;
      endTime: string;
    }[]
  >,
) {
  const entries = Object.entries(grouped)
    .map(([day, slots]) => ({
      day: Number(day),
      slots,
    }))
    .sort((a, b) => a.day - b.day);

  const result: string[] = [];

  let startDay = entries[0]?.day;
  let previousDay = entries[0]?.day;

  let currentStart = entries[0]?.slots?.[0]?.startTime;
  let currentEnd = entries[0]?.slots?.[0]?.endTime;

  for (let i = 1; i <= entries.length; i++) {
    const current = entries[i];

    const sameSchedule =
      current &&
      current.slots?.[0]?.startTime === currentStart &&
      current.slots?.[0]?.endTime === currentEnd &&
      current.day === previousDay + 1;

    if (sameSchedule) {
      previousDay = current.day;
      continue;
    }

    if (startDay !== undefined) {
      const dayLabel =
        startDay === previousDay
          ? dayNames[startDay]
          : `${dayNames[startDay]} – ${dayNames[previousDay]}`;

      result.push(
        `${dayLabel}: ${formatTime(currentStart)} – ${formatTime(currentEnd)}`,
      );
    }

    startDay = current?.day;
    previousDay = current?.day;
    currentStart = current?.slots?.[0]?.startTime;
    currentEnd = current?.slots?.[0]?.endTime;
  }

  return result;
}
