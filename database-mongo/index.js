var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/progress', {useNewUrlParser: true});

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var progressSchema = mongoose.Schema({
  workout: String,
  date_posted: String,
  imageUrl: String
});

var Progress = mongoose.model('Progress', progressSchema);

var selectAll = function(callback) {
  Progress.find({}, function(err, progressions) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, progressions);
    }
  })
};

module.exports.Progress = Progress;
module.exports.selectAll = selectAll;