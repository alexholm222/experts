export const timeNow = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seeconds = date.getSeconds();
    const miliSeconds = date.getMilliseconds();
    return (hours + minutes + seeconds + miliSeconds)
}

export const handleDay = (n) => {
    const date = new Date();
    date.setDate(date.getDate() + n);
    const day = date.getDate();
    const fDay = date.getDay();

    let dayWeek;
    switch (fDay) {
        case 1: dayWeek = "Пн"; break;
        case 2: dayWeek = "Вт"; break;
        case 3: dayWeek = "Ср"; break;
        case 4: dayWeek = "Чт"; break;
        case 5: dayWeek = "Пт"; break;
        case 6: dayWeek = "Сб"; break;
        default: dayWeek = "Вс";
    }

    return { day, dayWeek, date }
}

export const handleTime = (n) => {
    const date = new Date();
    date.setHours(date.getHours() + n);
    const hour = date.getHours();
    const minute = date.getMinutes();
    return { hour, minute }
}

export const handleTaskTime = (d) => {
    const date = new Date(d);
    const date2 = new Date();
    const month = date.getMonth();
    const month2 = date2.getMonth();
    const day = date.getDate();
    const day2 = date2.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    let fMonth;
    switch (month){
      case 0: fMonth = "января"; break;
      case 1: fMonth="февраля"; break;
      case 2: fMonth="марта"; break;
      case 3: fMonth="апреля"; break;
      case 4: fMonth="мая"; break;
      case 5: fMonth="июня"; break;
      case 6: fMonth="июля"; break;
      case 7: fMonth="августа"; break;
      case 8: fMonth="сентября"; break;
      case 9: fMonth="октября"; break;
      case 10: fMonth="ноября"; break;
      case 11: fMonth="декабря"; break;
      default:
  }

    if(d == '0000-00-00 00:00:00') {
        return ''
    } 

    if(month == month2 && day == day2) {
        return `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`
    }

    if(month !== month2 || day !== day2) {
        return `${day} ${fMonth}`
    }
  
}

export const handleDateDifference = (d) => {
    const date = new Date();
    const date2 = new Date(d);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const day2 = date2.getDate();
    const month2 = date2.getMonth();
    const year2 = date2.getFullYear();
    const diffDays = Math.ceil((date - date2) / (1000 * 60 * 60 * 24));

    if(!d) {
        return ''
    }

    if (day == day2 && month == month2 && year == year2) {
        return 'Сегодня'
    }

    if ((day - day2 == 1 && month == month2 && year == year2)) {
        return 'Вчера'
    }

    if ((day - day2  > 1) || (month !== month2) || (year !== year2)) {
        return `${diffDays} дн`
    }
}