const getCreationTime = (creationTime: number): string => {
  const date = new Date(creationTime);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  } as Intl.DateTimeFormatOptions;

  return date.toLocaleDateString("ru-RU", options);
};

// const getCreationTime = (milliseconds: number): string => {
//   const date = new Date(milliseconds * 1000);
//   if (!milliseconds) {
//     return "unknown";
//   }
//   return (
//     ("0" + date.getDate()).slice(-2) +
//     "/" +
//     ("0" + (date.getMonth() + 1)).slice(-2) +
//     "/" +
//     date.getFullYear() +
//     " " +
//     ("0" + date.getHours()).slice(-2) +
//     ":" +
//     ("0" + date.getMinutes()).slice(-2) +
//     ":" +
//     ("0" + date.getSeconds()).slice(-2)
//   );
// };

export default getCreationTime;
