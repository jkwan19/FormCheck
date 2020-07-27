const db = require('./index.js');
const faker = require('faker');

const progressData = [];
const generateData = (end = 1) => {
  for (let i = 0; i <= end; i++) {
    let workout = ["Shoulders", "Planks"];
    let randomWorkout = Math.floor(Math.random() * workout.length) + 0
    progressData.push({
      workout: workout[randomWorkout],
      date_posted: faker.date.past(),
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