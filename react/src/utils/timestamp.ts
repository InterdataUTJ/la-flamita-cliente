function format(timestamp?: string, dateOnly = false, showSeconds = true) {
  // Get Date object from timestampt string
  const date = timestamp ? new Date(timestamp) : new Date();
  
  // Return formatted date
  return date.toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: dateOnly ? undefined : "2-digit",
    minute: dateOnly ? undefined : "2-digit",
    second: (dateOnly || !showSeconds) ? undefined : "2-digit",
    hour12: true,
  });
};

export default {
  format,
};