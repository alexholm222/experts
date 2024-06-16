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
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

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

    return { day, dayWeek, date, textDate: `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}` }
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
    switch (month) {
        case 0: fMonth = "января"; break;
        case 1: fMonth = "февраля"; break;
        case 2: fMonth = "марта"; break;
        case 3: fMonth = "апреля"; break;
        case 4: fMonth = "мая"; break;
        case 5: fMonth = "июня"; break;
        case 6: fMonth = "июля"; break;
        case 7: fMonth = "августа"; break;
        case 8: fMonth = "сентября"; break;
        case 9: fMonth = "октября"; break;
        case 10: fMonth = "ноября"; break;
        case 11: fMonth = "декабря"; break;
        default:
    }

    if (d == '0000-00-00 00:00:00') {
        return ''
    }

    if (month == month2 && day == day2) {
        return `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`
    }

    if (month !== month2 || day !== day2) {
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

    if (!d || d == '0000-00-00 00:00:00') {
        return ''
    }

    if (day == day2 && month == month2 && year == year2) {
        return 'Сегодня'
    }

    if ((day - day2 == 1 && month == month2 && year == year2)) {
        return 'Вчера'
    }

    if ((day - day2 > 1) || (month !== month2) || (year !== year2)) {
        return `${diffDays} дн`
    }
}

export const handleDatePlaner = (d) => {
    const date = new Date(d);
    const month = date.getMonth();
    const day = date.getDate();
    const dateNow = new Date();
    const dayNow = dateNow.getDate();
    const options = { weekday: 'long' };
    const dayOfWeek = date.toLocaleString('ru-RU', options);

    let fMonth;
    switch (month) {
        case 0: fMonth = "января"; break;
        case 1: fMonth = "февраля"; break;
        case 2: fMonth = "марта"; break;
        case 3: fMonth = "апреля"; break;
        case 4: fMonth = "мая"; break;
        case 5: fMonth = "июня"; break;
        case 6: fMonth = "июля"; break;
        case 7: fMonth = "августа"; break;
        case 8: fMonth = "сентября"; break;
        case 9: fMonth = "октября"; break;
        case 10: fMonth = "ноября"; break;
        case 11: fMonth = "декабря"; break;
        default:
    }

    if (dayNow - day == 1) {
        return {
            date: 'Вчера',
            dayOfWeek,
            state: -1,
        }
    }

    if (dayNow - day > 1) {
        return {
            date: `${day} ${fMonth}`,
            dayOfWeek,
            state: -1,
        }
    }

    if (dayNow - day == 0) {
        return {
            date: 'Сегодня',
            dayOfWeek,
            state: 0,
        }
    }

    if (day - dayNow == 1) {
        return {
            date: 'Завтра',
            dayOfWeek,
            state: 1,
        }
    }

    if (day - dayNow > 1) {
        return {
            date: `${day} ${fMonth}`,
            dayOfWeek,
            state: 1,
        }
    }

}

export const handleTimeText = (d) => {
    const date = new Date(d);
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`
}

export const handleDateZoomDiff = (d1, d2) => {
    const date = new Date(d1);
    const date2 = new Date(d2);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const day2 = date2.getDate();
    const month2 = date2.getMonth();
    const year2 = date2.getFullYear();

    const hour = date.getHours();
    const minute = date.getMinutes();
    const hour2 = date2.getHours();
    const minute2 = date2.getMinutes()

    if ((day == day2 && month == month2 && year == year2)) {
        return true
    } else {
        return false
    }
};

export const handleDateZoomDiff2 = (d2) => {
    const date = new Date();
    const date2 = new Date(d2);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const day2 = date2.getDate();
    const month2 = date2.getMonth();
    const year2 = date2.getFullYear();

    if ((day == day2 && month == month2 && year == year2)) {
        return true
    } else {
        return false
    }
};


export const handleCurrentHour = (d) => {
    const date = new Date();
    const date2 = new Date(d);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const day2 = date2.getDate();
    const month2 = date2.getMonth();
    const year2 = date2.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const hour2 = date2.getHours();
    const minute2 = date2.getMinutes();

    if ((day2 == day && hour2 == hour && minute >= minute2 && minute - minute2 < 10) || (day2 == day && hour2 == hour && minute2 !== 0 && minute2 - minute <= 15) || (day2 == day && hour2 - hour == 1 && minute2 == 0 && minute > 45)) {
        return true
    } else {
        return false
    }
}

export const handleTimeForCity = (timezone) => {
    const date = new Date();
    const hour = (date.getHours() - 3 + timezone) >= 24 ? (date.getHours() - 3 + timezone) - 24 : date.getHours() - 3 + timezone;
    const minute = date.getMinutes();

    return `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`
}

export const handleDateForComment = (d) => {
    const date = new Date(d);
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    const dateNow = new Date();
    const dayNow = dateNow.getDate();
    const monthNow = dateNow.getMonth();
    const yearNow = dateNow.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const options = { weekday: 'long' };
    const dayOfWeek = date.toLocaleString('ru-RU', options);

    let fMonth;
    switch (month) {
        case 0: fMonth = "янв"; break;
        case 1: fMonth = "фев"; break;
        case 2: fMonth = "мар"; break;
        case 3: fMonth = "апр"; break;
        case 4: fMonth = "мая"; break;
        case 5: fMonth = "июня"; break;
        case 6: fMonth = "июля"; break;
        case 7: fMonth = "авг"; break;
        case 8: fMonth = "сен"; break;
        case 9: fMonth = "окт"; break;
        case 10: fMonth = "ноя"; break;
        case 11: fMonth = "дек"; break;
        default:
    }

    if (year == yearNow && month == monthNow && dayNow - day == 1) {
        return 'Вчера'
    }


    if (year == yearNow && month == monthNow && dayNow - day == 0) {
        return `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`
    }

    if (!(year == yearNow && month == monthNow && dayNow - day == 0) || !(year == yearNow && month == monthNow && dayNow - day == 1)) {
        return `${day} ${fMonth} ${yearNow !== year ? year : ''}`
    }
}

export const handleEmptyTask = (n) => {
    const dateL = new Date();
    const dateN = new Date(n);

    if (dateN < dateL) {
        return true
    } else {
        return false
    }
};

export const handleDateForPlan = (d, h, m) => {
    const dateText1 = `${d}T${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m}:00`;

    const date2 = new Date();
    const minutes = h * 60 + m;
    console.log(minutes, date2.getMinutes(), date2)
    date2.setMinutes(date2.getMinutes() + minutes);
    const year = date2.getFullYear();
    const month = date2.getMonth() + 1;
    const day = date2.getDate();
    const hours = date2.getHours();
    const minute = date2.getMinutes();

    const dateText2 = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}T${hours < 10 ? `0${hours}` : hours}:${minute < 10 ? `0${minute}` : minute}:00`;
    return {
        dateText1,
        dateText2
    }
}

export const handleDatePlan = (d) => {
    const date = new Date(d);
    const dateNow = new Date();
    const time = d?.slice(-8, -3);
    const day = date.getDate();
    const month = date.getMonth();
    const dayNow = dateNow.getDate();

    let fMonth;
    switch (month) {
        case 0: fMonth = "января"; break;
        case 1: fMonth = "февраля"; break;
        case 2: fMonth = "марта"; break;
        case 3: fMonth = "апреля"; break;
        case 4: fMonth = "мая"; break;
        case 5: fMonth = "июня"; break;
        case 6: fMonth = "июля"; break;
        case 7: fMonth = "августа"; break;
        case 8: fMonth = "сентября"; break;
        case 9: fMonth = "октября"; break;
        case 10: fMonth = "ноября"; break;
        case 11: fMonth = "декабря"; break;
        default:
    }

    if (dayNow - day == 0) {
        return `сегодня в ${time}`
    }

    if (day - dayNow == 1) {
        return `завтра в ${time}`
    }

    if (day - dayNow > 1) {
        return `на ${day} ${fMonth} в ${time}`
    }

    if (day - dayNow < 0) {
        return `на ${day} ${fMonth} в ${time}`
    }
}

export const handleDateAnketa = (d) => {
    const date = new Date(d);
    const dateNow = new Date();
    const time = d?.slice(-8, -3);
    const day = date.getDate();
    const month = date.getMonth();
    const dayNow = dateNow.getDate();

    let fMonth;
    switch (month) {
        case 0: fMonth = "января"; break;
        case 1: fMonth = "февраля"; break;
        case 2: fMonth = "марта"; break;
        case 3: fMonth = "апреля"; break;
        case 4: fMonth = "мая"; break;
        case 5: fMonth = "июня"; break;
        case 6: fMonth = "июля"; break;
        case 7: fMonth = "августа"; break;
        case 8: fMonth = "сентября"; break;
        case 9: fMonth = "октября"; break;
        case 10: fMonth = "ноября"; break;
        case 11: fMonth = "декабря"; break;
        default:
    }

    if (dayNow - day == 0) {
        return `сегодня ${time}`
    }

    if (day - dayNow == -1) {
        return `вчера ${time}`
    }

    if (day - dayNow >= 1) {
        return `${day} ${fMonth} ${time}`
    }

    if (day - dayNow < 0) {
        return `${day} ${fMonth} ${time}`
    }
}

export const handleDifDateZoom = (d) => {
    const date = new Date(d);
    const dateNow = new Date();
    const diffDays = (dateNow - date) / (1000 * 60);
   console.log(dateNow, date,  diffDays)
    if(diffDays > 60) {
        return true
    }

    if(diffDays <= 60) {
        return false
    }
}


export const handleDateStudyReq = (d) => {
    const mo = d?.slice(3, 5);
    const da = d?.slice(0, 2);
    const ye = d?.slice(-4)
    console.log(da, mo, ye)
    const date = new Date(`${ye}-${mo}-${da}`);
    const month = date.getMonth();
    const day = date.getDate();
    const dateNow = new Date();
    const dayNow = dateNow.getDate();
    const options = { weekday: 'long' };
    const dayOfWeek = date.toLocaleString('ru-RU', options);

    let fMonth;
    switch (month) {
        case 0: fMonth = "января"; break;
        case 1: fMonth = "февраля"; break;
        case 2: fMonth = "марта"; break;
        case 3: fMonth = "апреля"; break;
        case 4: fMonth = "мая"; break;
        case 5: fMonth = "июня"; break;
        case 6: fMonth = "июля"; break;
        case 7: fMonth = "августа"; break;
        case 8: fMonth = "сентября"; break;
        case 9: fMonth = "октября"; break;
        case 10: fMonth = "ноября"; break;
        case 11: fMonth = "декабря"; break;
        default:
    }

    if (dayNow - day == 1) {
        return {
            date: 'Вчера',
            dayOfWeek,
            state: -1,
        }
    }

    if (dayNow - day > 1) {
        return {
            date: `${day} ${fMonth}`,
            dayOfWeek,
            state: -1,
        }
    }

    if (dayNow - day == 0) {
        return {
            date: 'Сегодня',
            dayOfWeek,
            state: 0,
        }
    }

    if (day - dayNow == 1) {
        return {
            date: 'Завтра',
            dayOfWeek,
            state: 1,
        }
    }

    if (day - dayNow > 1) {
        return {
            date: `${day} ${fMonth}`,
            dayOfWeek,
            state: 1,
        }
    }
}

export const handleDateFormat = (d) => {
    const date = new Date(d);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day > 10 ? day : `0${day}`}.${month > 10 ? month : `0${month}`}.${year}`
}