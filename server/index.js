var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var Progress = require('../database/index.js');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

app.get('/progress', function (req, res) {
  const selectAll = (callback) => {
    Progress.find({}, function(err, data) {
      if(err) {
        res.sendStatus(500);
      } else {
        res.json(data);
      }
    })
  };
  selectAll(function(err, progression) {
    if(err) {
      console.log('error getting data: ', progression)
    } else {
      console.log('success')
    }
  });
});

app.post('/progress', function (req, res) {
  let progress = new Progress(req.body);
  const create = ((callback) => {
    progress.save((err, data) => {
      if (err) {
        console.log('error posting:', err);
      } else {
        res.send(data)
      }
    })
  })
  create((err, data) => {
    if (err) {
      res.sendStatus(500)
    } else {
      console.log('posted')
    }
  })
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

