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

function printSuccessOrFailed(assert, result, expected, text) {
    if (assert) {
        console.info(text);
    } else {
        console.error(text);
        console.error('result:', result);
        console.error('expect:', expected);
    }
}

function diffTime() {
    // const pastTime = new Date(Date.UTC(2024, 5 - 1, 25, 15, 35, 25, 333));
    // const nowTime = new Date(Date.UTC(2025, 5 - 1, 25, 15, 35, 25, 332));
    // // const nowTime = new Date(Date.now());
    // const differenceTime = dateDifference(pastTime.getTime(), nowTime.getTime());
    // console.debug('differenceTime:', differenceTime);

    let result;
    let expected;
    let oldDate;
    let newDate;
    let assert;

    oldDate = new Date(Date.UTC(2024, 5 - 1, 25, 15, 35, 25, 333));
    newDate = new Date(Date.UTC(2024, 5 - 1, 25, 15, 35, 25, 333));
    expected = {milliseconds: 0, seconds: 0, minutes: 0, hours: 0, days: 0, months: 0, years: 0};
    result = dateDifference(oldDate.getTime(), newDate.getTime());
    assert = JSON.stringify(result) === JSON.stringify(expected);
    printSuccessOrFailed(assert, result, expected, `${assert} | Expected not modified the time | ${oldDate.toISOString()} vs ${newDate.toISOString()}`);

    oldDate = new Date(Date.UTC(2024, 5 - 1, 25, 15, 35, 25, 333));
    newDate = new Date(Date.UTC(2024, 5 - 1, 25, 15, 35, 25, 334));
    expected = {milliseconds: 1, seconds: 0, minutes: 0, hours: 0, days: 0, months: 0, years: 0};
    result = dateDifference(oldDate.getTime(), newDate.getTime());
    assert = JSON.stringify(result) === JSON.stringify(expected);
    printSuccessOrFailed(assert, result, expected, `${assert} | Expected 1 millisecond incremented | ${oldDate.toISOString()} vs ${newDate.toISOString()}`);

    oldDate = new Date(Date.UTC(2024, 5 - 1, 25, 15, 35, 25, 333));
    newDate = new Date(Date.UTC(2024, 5 - 1, 25, 15, 35, 25, 386));
    expected = {milliseconds: 53, seconds: 0, minutes: 0, hours: 0, days: 0, months: 0, years: 0};
    result = dateDifference(oldDate.getTime(), newDate.getTime());
    assert = JSON.stringify(result) === JSON.stringify(expected);
    printSuccessOrFailed(assert, result, expected, `${assert} | Expected 53 milliseconds incremented | ${oldDate.toISOString()} vs ${newDate.toISOString()}`);

    oldDate = new Date(Date.UTC(2024, 5 - 1, 25, 15, 35, 25, 333));
    newDate = new Date(Date.UTC(2024, 5 - 1, 25, 15, 35, 26, 333));
    expected = {milliseconds: 0, seconds: 1, minutes: 0, hours: 0, days: 0, months: 0, years: 0};
    result = dateDifference(oldDate.getTime(), newDate.getTime());
    assert = JSON.stringify(result) === JSON.stringify(expected);
    printSuccessOrFailed(assert, result, expected, `${assert} | Expected 1 second incremented | ${oldDate.toISOString()} vs ${newDate.toISOString()}`);

    oldDate = new Date(Date.UTC(2024, 5 - 1, 25, 15, 35, 25, 333));
    newDate = new Date(Date.UTC(2024, 5 - 1, 25, 15, 35, 48, 333));
    expected = {milliseconds: 0, seconds: 23, minutes: 0, hours: 0, days: 0, months: 0, years: 0};
    result = dateDifference(oldDate.getTime(), newDate.getTime());
    assert = JSON.stringify(result) === JSON.stringify(expected);
    printSuccessOrFailed(assert, result, expected, `${assert} | Expected 23 seconds incremented | ${oldDate.toISOString()} vs ${newDate.toISOString()}`);

    oldDate = new Date(Date.UTC(2024, 5 - 1, 25, 15, 35, 25, 333));
    newDate = new Date(Date.UTC(2024, 5 - 1, 25, 15, 36, 25, 333));
    expected = {milliseconds: 0, seconds: 0, minutes: 1, hours: 0, days: 0, months: 0, years: 0};
    result = dateDifference(oldDate.getTime(), newDate.getTime());
    assert = JSON.stringify(result) === JSON.stringify(expected);
    printSuccessOrFailed(assert, result, expected, `${assert} | Expected 1 minute incremented | ${oldDate.toISOString()} vs ${newDate.toISOString()}`);

    oldDate = new Date(Date.UTC(2024, 5 - 1, 25, 15, 35, 25, 333));
    newDate = new Date(Date.UTC(2024, 5 - 1, 25, 15, 51, 25, 333));
    expected = {milliseconds: 0, seconds: 0, minutes: 16, hours: 0, days: 0, months: 0, years: 0};
    result = dateDifference(oldDate.getTime(), newDate.getTime());
    assert = JSON.stringify(result) === JSON.stringify(expected);
    printSuccessOrFailed(assert, result, expected, `${assert} | Expected 16 minutes incremented | ${oldDate.toISOString()} vs ${newDate.toISOString()}`);

    oldDate = new Date(Date.UTC(2024, 5 - 1, 25, 15, 35, 25, 333));
    newDate = new Date(Date.UTC(2024, 5 - 1, 25, 16, 35, 25, 333));
    expected = {milliseconds: 0, seconds: 0, minutes: 0, hours: 1, days: 0, months: 0, years: 0};
    result = dateDifference(oldDate.getTime(), newDate.getTime());
    assert = JSON.stringify(result) === JSON.stringify(expected);
    printSuccessOrFailed(assert, result, expected, `${assert} | Expected 1 hour incremented | ${oldDate.toISOString()} vs ${newDate.toISOString()}`);

    oldDate = new Date(Date.UTC(2024, 5 - 1, 25, 15, 35, 25, 333));
    newDate = new Date(Date.UTC(2024, 5 - 1, 25, 22, 35, 25, 333));
    expected = {milliseconds: 0, seconds: 0, minutes: 0, hours: 7, days: 0, months: 0, years: 0};
    result = dateDifference(oldDate.getTime(), newDate.getTime());
    assert = JSON.stringify(result) === JSON.stringify(expected);
    printSuccessOrFailed(assert, result, expected, `${assert} | Expected 7 hours incremented | ${oldDate.toISOString()} vs ${newDate.toISOString()}`);

    oldDate = new Date(Date.UTC(2024, 5 - 1, 25, 15, 35, 25, 333));
    newDate = new Date(Date.UTC(2024, 5 - 1, 26, 15, 35, 25, 333));
    expected = {milliseconds: 0, seconds: 0, minutes: 0, hours: 0, days: 1, months: 0, years: 0};
    result = dateDifference(oldDate.getTime(), newDate.getTime());
    assert = JSON.stringify(result) === JSON.stringify(expected);
    printSuccessOrFailed(assert, result, expected, `${assert} | Expected 1 day incremented | ${oldDate.toISOString()} vs ${newDate.toISOString()}`);

    oldDate = new Date(Date.UTC(2024, 5 - 1, 25, 15, 35, 25, 333));
    newDate = new Date(Date.UTC(2024, 5 - 1, 28, 15, 35, 25, 333));
    expected = {milliseconds: 0, seconds: 0, minutes: 0, hours: 0, days: 3, months: 0, years: 0};
    result = dateDifference(oldDate.getTime(), newDate.getTime());
    assert = JSON.stringify(result) === JSON.stringify(expected);
    printSuccessOrFailed(assert, result, expected, `${assert} | Expected 3 days incremented | ${oldDate.toISOString()} vs ${newDate.toISOString()}`);

    oldDate = new Date(Date.UTC(2024, 5 - 1, 25, 15, 35, 25, 333));
    newDate = new Date(Date.UTC(2024, 6 - 1, 25, 15, 35, 25, 333));
    expected = {milliseconds: 0, seconds: 0, minutes: 0, hours: 0, days: 0, months: 1, years: 0};
    result = dateDifference(oldDate.getTime(), newDate.getTime());
    assert = JSON.stringify(result) === JSON.stringify(expected);
    printSuccessOrFailed(assert, result, expected, `${assert} | Expected 1 month incremented | ${oldDate.toISOString()} vs ${newDate.toISOString()}`);

    oldDate = new Date(Date.UTC(2024, 5 - 1, 25, 15, 35, 25, 333));
    newDate = new Date(Date.UTC(2024, 11 - 1, 25, 15, 35, 25, 333));
    expected = {milliseconds: 0, seconds: 0, minutes: 0, hours: 0, days: 0, months: 6, years: 0};
    result = dateDifference(oldDate.getTime(), newDate.getTime());
    assert = JSON.stringify(result) === JSON.stringify(expected);
    printSuccessOrFailed(assert, result, expected, `${assert} | Expected 6 months incremented | ${oldDate.toISOString()} vs ${newDate.toISOString()}`);

    oldDate = new Date(Date.UTC(2024, 5 - 1, 25, 15, 35, 25, 333));
    newDate = new Date(Date.UTC(2025, 5 - 1, 25, 15, 35, 25, 333));
    expected = {milliseconds: 0, seconds: 0, minutes: 0, hours: 0, days: 0, months: 0, years: 1};
    result = dateDifference(oldDate.getTime(), newDate.getTime());
    assert = JSON.stringify(result) === JSON.stringify(expected);
    printSuccessOrFailed(assert, result, expected, `${assert} | Expected 1 year incremented | ${oldDate.toISOString()} vs ${newDate.toISOString()}`);

    oldDate = new Date(Date.UTC(2024, 5 - 1, 25, 15, 35, 25, 333));
    newDate = new Date(Date.UTC(2348, 5 - 1, 25, 15, 35, 25, 333));
    expected = {milliseconds: 0, seconds: 0, minutes: 0, hours: 0, days: 0, months: 0, years: 324};
    result = dateDifference(oldDate.getTime(), newDate.getTime());
    assert = JSON.stringify(result) === JSON.stringify(expected);
    printSuccessOrFailed(assert, result, expected, `${assert} | Expected 324 years incremented | ${oldDate.toISOString()} vs ${newDate.toISOString()}`);

    oldDate = new Date(Date.UTC(2024, 3 - 1, 7, 15, 35, 25, 333));
    newDate = new Date(Date.UTC(2081, 12 - 1, 26, 23, 59, 28, 379));
    expected = {milliseconds: 46, seconds: 3, minutes: 24, hours: 8, days: 19, months: 9, years: 57};
    result = dateDifference(oldDate.getTime(), newDate.getTime());
    assert = JSON.stringify(result) === JSON.stringify(expected);
    printSuccessOrFailed(assert, result, expected, `${assert} | Expected 57y,9m,19dT08:24:03.46z | ${oldDate.toISOString()} vs ${newDate.toISOString()}`);

    oldDate = new Date(Date.UTC(2024, 5 - 1, 25, 15, 35, 25, 334));
    newDate = new Date(Date.UTC(2024, 5 - 1, 25, 15, 35, 26, 333));
    expected = {milliseconds: 999, seconds: 0, minutes: 0, hours: 0, days: 0, months: 0, years: 0};
    result = dateDifference(oldDate.getTime(), newDate.getTime());
    assert = JSON.stringify(result) === JSON.stringify(expected);
    printSuccessOrFailed(assert, result, expected, `${assert} | Expected 999 millisecond incremented | ${oldDate.toISOString()} vs ${newDate.toISOString()}`);

    oldDate = new Date(Date.UTC(2024, 5 - 1, 25, 15, 35, 26, 333));
    newDate = new Date(Date.UTC(2024, 5 - 1, 25, 15, 36, 25, 333));
    expected = {milliseconds: 0, seconds: 59, minutes: 0, hours: 0, days: 0, months: 0, years: 0};
    result = dateDifference(oldDate.getTime(), newDate.getTime());
    assert = JSON.stringify(result) === JSON.stringify(expected);
    printSuccessOrFailed(assert, result, expected, `${assert} | Expected 59 seconds incremented | ${oldDate.toISOString()} vs ${newDate.toISOString()}`);

    oldDate = new Date(Date.UTC(2024, 5 - 1, 25, 15, 36, 25, 333));
    newDate = new Date(Date.UTC(2024, 5 - 1, 25, 16, 35, 25, 333));
    expected = {milliseconds: 0, seconds: 0, minutes: 59, hours: 0, days: 0, months: 0, years: 0};
    result = dateDifference(oldDate.getTime(), newDate.getTime());
    assert = JSON.stringify(result) === JSON.stringify(expected);
    printSuccessOrFailed(assert, result, expected, `${assert} | Expected 59 minutes incremented | ${oldDate.toISOString()} vs ${newDate.toISOString()}`);

    oldDate = new Date(Date.UTC(2024, 5 - 1, 25, 16, 35, 25, 333));
    newDate = new Date(Date.UTC(2024, 5 - 1, 26, 15, 35, 25, 333));
    expected = {milliseconds: 0, seconds: 0, minutes: 0, hours: 23, days: 0, months: 0, years: 0};
    result = dateDifference(oldDate.getTime(), newDate.getTime());
    assert = JSON.stringify(result) === JSON.stringify(expected);
    printSuccessOrFailed(assert, result, expected, `${assert} | Expected 23 hours incremented | ${oldDate.toISOString()} vs ${newDate.toISOString()}`);

    oldDate = new Date(Date.UTC(2024, 5 - 1, 26, 15, 35, 25, 333));
    newDate = new Date(Date.UTC(2024, 6 - 1, 25, 15, 35, 25, 333));
    expected = {milliseconds: 0, seconds: 0, minutes: 0, hours: 0, days: 30, months: 0, years: 0};
    result = dateDifference(oldDate.getTime(), newDate.getTime());
    assert = JSON.stringify(result) === JSON.stringify(expected);
    printSuccessOrFailed(assert, result, expected, `${assert} | Expected 30 days incremented | ${oldDate.toISOString()} vs ${newDate.toISOString()}`);

    oldDate = new Date(Date.UTC(2024, 6 - 1, 25, 15, 35, 25, 333));
    newDate = new Date(Date.UTC(2025, 5 - 1, 25, 15, 35, 25, 333));
    expected = {milliseconds: 0, seconds: 0, minutes: 0, hours: 0, days: 0, months: 11, years: 0};
    result = dateDifference(oldDate.getTime(), newDate.getTime());
    assert = JSON.stringify(result) === JSON.stringify(expected);
    printSuccessOrFailed(assert, result, expected, `${assert} | Expected 11 months incremented | ${oldDate.toISOString()} vs ${newDate.toISOString()}`);

    oldDate = new Date(Date.UTC(2024, 5 - 1, 25, 15, 35, 25, 334));
    newDate = new Date(Date.UTC(2025, 5 - 1, 25, 15, 35, 25, 333));
    expected = {milliseconds: 999, seconds: 59, minutes: 59, hours: 23, days: 29, months: 11, years: 0};
    result = dateDifference(oldDate.getTime(), newDate.getTime());
    assert = JSON.stringify(result) === JSON.stringify(expected);
    printSuccessOrFailed(assert, result, expected, `${assert} | Expected 0y,11m,29d,23:59:59:999z | ${oldDate.toISOString()} vs ${newDate.toISOString()}`);

    oldDate = new Date(Date.UTC(2024, 5 - 1, 25, 15, 35, 25, 334));
    newDate = new Date(Date.UTC(2026, 5 - 1, 25, 15, 35, 25, 333));
    expected = {milliseconds: 999, seconds: 59, minutes: 59, hours: 23, days: 29, months: 11, years: 1};
    result = dateDifference(oldDate.getTime(), newDate.getTime());
    assert = JSON.stringify(result) === JSON.stringify(expected);
    printSuccessOrFailed(assert, result, expected, `${assert} | Expected 1y,11m,29d,23:59:59:999z | ${oldDate.toISOString()} vs ${newDate.toISOString()}`);

    oldDate = new Date(Date.UTC(2024, 5 - 1, 25, 15, 35, 25, 334));
    newDate = new Date(Date.UTC(2035, 5 - 1, 26, 15, 35, 25, 333));
    expected = {milliseconds: 999, seconds: 59, minutes: 59, hours: 23, days: 0, months: 0, years: 11};
    result = dateDifference(oldDate.getTime(), newDate.getTime());
    assert = JSON.stringify(result) === JSON.stringify(expected);
    printSuccessOrFailed(assert, result, expected, `${assert} | Expected 11y,0m,0d,23:59:59:999z | ${oldDate.toISOString()} vs ${newDate.toISOString()}`);

    oldDate = new Date(Date.UTC(2019, 9 - 1, 28, 16, 21, 51, 0));
    newDate = new Date(Date.UTC(2024, 3 - 1, 1, 6, 5, 24, 928));
    expected = {milliseconds: 928, seconds: 33, minutes: 43, hours: 13, days: 1, months: 5, years: 4};
    result = dateDifference(oldDate.getTime(), newDate.getTime());
    assert = JSON.stringify(result) === JSON.stringify(expected);
    printSuccessOrFailed(assert, result, expected, `${assert} | Expected 4y,5m,1d,13:43:33:928z | ${oldDate.toISOString()} vs ${newDate.toISOString()}`);

    // oldDate.toISOString(): "2020-09-28T16:21:51.000Z"
    // newDate.toISOString(): "2023-02-28T06:05:24.928Z"
    oldDate = new Date(Date.UTC(2020, 9 - 1, 28, 16, 21, 51, 0));
    newDate = new Date(Date.UTC(2023, 2 - 1, 28, 6, 5, 24, 928));
    expected = {milliseconds: 928, seconds: 33, minutes: 43, hours: 13, days: 30, months: 4, years: 2};
    result = dateDifference(oldDate.getTime(), newDate.getTime());
    assert = JSON.stringify(result) === JSON.stringify(expected);
    printSuccessOrFailed(assert, result, expected, `${assert} | Expected 2y,4m,30d,13:43:33:928z | ${oldDate.toISOString()} vs ${newDate.toISOString()}`);
}

diffTime();
