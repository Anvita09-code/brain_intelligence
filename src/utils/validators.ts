export const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const isValidEndpoint = (url: string): boolean => {
  return url.startsWith("ws://") || url.startsWith("wss://") || url.startsWith("http://") || url.startsWith("https://");
};
