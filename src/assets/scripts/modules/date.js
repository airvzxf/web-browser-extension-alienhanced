function dateDifference(oldTime, newTime) {
    const maxMillisecond = 1000;
    const maxSecond = 60;
    const maxMinute = 60;
    const maxHour = 24;
    const maxMonth = 12;

    const oldDate = new Date(oldTime);
    const newDate = new Date(newTime);

    const difference = {};
    difference.milliseconds = (newDate.getUTCMilliseconds() - oldDate.getUTCMilliseconds());
    if (difference.milliseconds < 0) {
        difference.milliseconds = maxMillisecond + difference.milliseconds;
        newDate.setUTCSeconds(newDate.getUTCSeconds() - 1);
    }
    difference.seconds = (newDate.getUTCSeconds() - oldDate.getUTCSeconds());
    if (difference.seconds < 0) {
        difference.seconds = maxSecond + difference.seconds;
        newDate.setUTCMinutes(newDate.getUTCMinutes() - 1);
    }
    difference.minutes = (newDate.getUTCMinutes() - oldDate.getUTCMinutes());
    if (difference.minutes < 0) {
        difference.minutes = maxMinute + difference.minutes;
        newDate.setUTCHours(newDate.getUTCHours() - 1);
    }
    difference.hours = (newDate.getUTCHours() - oldDate.getUTCHours());
    if (difference.hours < 0) {
        difference.hours = maxHour + difference.hours;
        newDate.setUTCDate(newDate.getUTCDate() - 1);
    }
    difference.days = (newDate.getUTCDate() - oldDate.getUTCDate());
    if (difference.days < 0) {
        const temporalDate = new Date(newDate);
        temporalDate.setUTCDate(1);
        temporalDate.setUTCDate(temporalDate.getUTCDate() - 1);
        const maxDay = temporalDate.getUTCDate();
        difference.days = maxDay + difference.days;
        newDate.setUTCMonth(newDate.getUTCMonth() - 1);
    }
    difference.months = (newDate.getUTCMonth() - oldDate.getUTCMonth());
    if (difference.months < 0) {
        difference.months = maxMonth + difference.months;
        newDate.setUTCFullYear(newDate.getUTCFullYear() - 1);
    }
    difference.years = (newDate.getUTCFullYear() - oldDate.getUTCFullYear());
    if (difference.years < 0) {
        difference.years = 0;
    }

    return difference;
}

export {dateDifference}
