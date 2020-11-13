const moment = require('moment');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/progress', {useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var progressSchema = new mongoose.Schema({
  workout: {type: String, required: true},
  image: {type: String, required: false}
  },
  {
    timestamps: true
  }
);

var Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;
