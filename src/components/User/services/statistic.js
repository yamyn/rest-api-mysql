const moment = require('moment');

/**
 * @function
 * @param {number} dayCount - count day of year
 * @returns {string} dateAgo
 */
function countMsInDays(dayCount) {
    const msInDay = 86400000;
    const countMS = dayCount * msInDay;

    const dateLast = Number(moment('2020 - 01 - 01', 'YYYY-MM-DD').format('x')) + countMS;
    const dateAgo = moment(dateLast, 'x').utc().format('DD-MM');

    return dateAgo;
}

/**
 * @function
 * @param {number} dayCount - count day ago
 * @returns {object} userStatistic
 */
function transformateStat(userStatisticArr) {
    const userStatistic = {
        labels: [],
        count: [],
    };
    userStatisticArr.map(({ date, count }) => {
        userStatistic.labels.push(date);
        userStatistic.count.push(count);
    });

    return userStatistic;
}

module.exports = transformateStat;
