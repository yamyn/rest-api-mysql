// const moment = require('moment');

// /**
//  * @function
//  * @param {number} dayCount - count day of year
//  * @returns {string} dateAgo
//  */
// function countMsInDays(dayCount) {
//     const msInDay = 86400000;
//     const countMS = dayCount * msInDay;

//     const dateLast = Number(moment('2020 - 01 - 01', 'YYYY-MM-DD').format('x')) + countMS;
//     const dateAgo = moment(dateLast, 'x').utc().format('DD-MM');

//     return dateAgo;
// }

// /**
//  * @function
//  * @param {number} dayCount - count day ago
//  * @returns {object} userStatistic
//  */
// async function getUserStat(dayCount) {
//     const lastMonthDay = moment().utc().dayOfYear() - dayCount;
//     const userStatisticArr = await UserModel.aggregate([
//         {
//             $project: {
//                 createdAt: 1,
//                 dayOfYear: {
//                     $dayOfYear: '$createdAt',
//                 },
//             },
//         },
//         {
//             $project: {
//                 dayOfYear: 1,
//                 isThisMonth: { $gte: ['$dayOfYear', lastMonthDay] },
//                 count: { $add: [1] },
//             },
//         },
//         { $match: { isThisMonth: true } },

//         {
//             $group: {
//                 _id: '$dayOfYear',
//                 number: { $sum: '$count' },
//             },
//         },
//         { $sort: { _id: 1 } },
//     ]);
//     console.log(userStatisticArr);
//     const userStatistic = {
//         labels: [],
//         count: [],
//     };
//     userStatisticArr.map(obj => {
//         const date = countMsInDays(obj._id);
//         userStatistic.labels.push(date);
//         userStatistic.count.push(obj.number);
//         return;
//     });

//     return userStatistic;
// }

// module.exports = getUserStat;
