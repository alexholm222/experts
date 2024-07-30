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


export function handleFormatDate(date) {
  const year = date.slice(6);
  const month = date.slice(3,5);
  const day = date.slice(0,2);
  return  `${year}-${month}-${day}`
}

export function handleCheckOutDate (date, numberDay) {
  const year = Number(date.slice(6));
  const month = Number(date.slice(3,5)) - 1;
  const day = Number(date.slice(0,2)) + Number(numberDay);
  const dateNew = new Date(year, month ,day);
  const yearA = dateNew.getFullYear();
  const monthA = dateNew.getMonth();
  const dayA = dateNew.getDate();
  
  let monthText;
  switch (monthA){
    case 0: monthText = "01"; break;
    case 1: monthText="02"; break;
    case 2: monthText="03"; break;
    case 3: monthText="04"; break;
    case 4: monthText="05"; break;
    case 5: monthText="06"; break;
    case 6: monthText="07"; break;
    case 7: monthText="08"; break;
    case 8: monthText="09"; break;
    case 9: monthText="10"; break;
    case 10: monthText="11"; break;
    case 11: monthText="12"; break;
    default:
  }
  return `${yearA}-${monthText}-${dayA < 10 ? `0${dayA}` : `${dayA}`}`
}

export function dateTextFormat(date) {
  const month = date.slice(5,7);
  const day = date.slice(8,10);
  
  let monthText;
  switch (month){
    case '01': monthText = "января"; break;
    case '02': monthText="февраля"; break;
    case '03': monthText="марта"; break;
    case '04': monthText="апреля"; break;
    case '05': monthText="мая"; break;
    case '06': monthText="июля"; break;
    case '07': monthText="июня"; break;
    case '08': monthText="августа"; break;
    case '09': monthText="сентября"; break;
    case '10': monthText="октября"; break;
    case '11': monthText="ноября"; break;
    case '12': monthText="декабря"; break;
    default:
  }
  return  `${day} ${monthText}`
}

export function dateTextFormatHead(date) {
  const year = date.slice(6);
  const month = date.slice(3,5);
  const day =   date.slice(0,2);

  let monthText;
  switch (month){
    case '01': monthText = "января"; break;
    case '02': monthText="февраля"; break;
    case '03': monthText="марта"; break;
    case '04': monthText="апреля"; break;
    case '05': monthText="мая"; break;
    case '06': monthText="июля"; break;
    case '07': monthText="июня"; break;
    case '08': monthText="августа"; break;
    case '09': monthText="сентября"; break;
    case '10': monthText="октября"; break;
    case '11': monthText="ноября"; break;
    case '12': monthText="декабря"; break;
    default:
  }
  return  `${day} ${monthText} ${year}`
}

export function dayText(day) {
  if (day === undefined) {
    return null
  } else {
    if (["2", "3", "4"].includes(day.slice(-1)) && !['11', '12', '13', '14'].includes(day)) {
      return "дня";
    }
    else if (day.slice(-1) === "1") {
      return "день";
    } else {
      return "дней";
    }
  }
};

export function hotelText(hotels) {
  if (hotels === undefined) {
    return null
  } else {
    if (["2", "3", "4"].includes(hotels.toString().slice(-1)) && !['11', '12', '13', '14'].includes(hotels.toString())) {
      return "отеля";
    }
    else if (hotels.toString().slice(-1) === "1" && hotels !== 11) {
      return "отель";
    } else {
      return "отелей";
    }
  }
}