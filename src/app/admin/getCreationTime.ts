const getCreationTime = (milliseconds: number): string => {
  const date = new Date(milliseconds * 1000);
  if (!milliseconds) {
    return "unknown";
  }
  return (
    ("0" + date.getDate()).slice(-2) +
    "/" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    date.getFullYear() +
    " " +
    ("0" + date.getHours()).slice(-2) +
    ":" +
    ("0" + date.getMinutes()).slice(-2) +
    ":" +
    ("0" + date.getSeconds()).slice(-2)
  );
};

export default getCreationTime;
