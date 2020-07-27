const db = require('./index.js');
const faker = require('faker');
const moment = require('moment');

const progressData = [];
const generateData = (end = 1) => {
  for (let i = 0; i <= end; i++) {
    progressData.push({
      workout: "Shoulders",
      date_posted: moment().calendar(null, {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday]',
        lastWeek: '[Last] dddd',
        sameElse: 'DD/MM/YYYY'
    }),
      imageUrl: faker.image.imageUrl()
    })
  }
  return progressData;
}

const insertProgressData = () => {
  generateData(20);
  db.Progress.create(progressData)
    .then(() => db.disconnect());
}

insertProgressData();