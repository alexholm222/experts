export function setDateFormat(date) {
    let year
    const dateFormat = new Date(date);
  const month = dateFormat.getMonth();
  year = dateFormat.getFullYear();
  const day = dateFormat.getDate()
  year = year.toString().slice(2)
  const dateText = `${day < 10 ? `0${day}` : `${day}`}.${month + 1 < 10 ? `0${month + 1}` : `${month + 1}`}.${year}`;
  return dateText;
}