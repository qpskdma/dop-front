const getCreationTime = (creationTime: number): string => {
  const date = new Date(creationTime * 1000);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  } as Intl.DateTimeFormatOptions;

  return date.toLocaleDateString("ru-RU", options).replace(/\,/g, " ");
};

export default getCreationTime;
