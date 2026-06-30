export const formatTimestamp = (date: Date = new Date()): string => {
  return date.toLocaleTimeString("en-US", { hour12: false });
};

export const formatFullDate = (date: Date = new Date()): string => {
  return date.toISOString().replace("T", " ").substring(0, 19);
};

export const getRelativeTime = (timestampStr: string): string => {
  try {
    return `Today at ${timestampStr}`;
  } catch {
    return timestampStr;
  }
};
