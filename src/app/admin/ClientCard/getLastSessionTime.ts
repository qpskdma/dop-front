const getLastSession = (timestamp: number | null): string => {
  if (!timestamp) {
    return " never";
  }
  const now = Math.floor(Date.now() / 1000);
  const seconds = now - timestamp;
  if (seconds > 60) {
    const minutes = seconds / 60;
    if (minutes > 60) {
      const hours = minutes / 60;

      if (hours > 24) {
        const days = hours / 24;
        return ` ${Math.floor(days)} days and ${Math.floor(
          hours % 24
        )} hours ago`;
      }
      return ` ${Math.floor(hours)} hours ago`;
    }
    return ` ${Math.floor(minutes)} minutes ago`;
  }
  return ` ${Math.floor(seconds)} seconds ago`;
};

export default getLastSession;
