const moment = require('moment');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/progress', {useNewUrlParser: true});

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var progressSchema = new mongoose.Schema({
  workout: {type: String, required: true},
  imageUrl: {type: String, required: true}
  },
  {
    timestamps: true
  }
);

var Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;
