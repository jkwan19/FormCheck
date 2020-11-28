const express = require('express');
const bodyParser = require('body-parser');
const Progress = require('../database/index.js');
const app = express();
const cors = require('cors');

const fs = require('fs');
const path = require('path');
const multer = require("multer");
const router = express.Router();
const destination = '/public/uploads';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })

app.use(cors());
// app.use(upload.single('image'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));


app.get('/progress', function (req, res) {
  const selectAll = (callback) => {
    Progress.find({}, function(err, data) {
      if(err) {
        res.sendStatus(500);
      } else {
        res.contentType('image/jpeg');
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


app.post('/upload-progress', upload.single('image'), function (req, res) {
  console.log(req.file, req.body.workout, req.file.path)
  if (!req.file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  const image = fs.readFileSync(req.file.path).toString('base64');
  var finalImg = {
    contentType: req.file.mimetype,
    image:  new Buffer(image, 'base64')
  };
  let progress = new Progress();
  progress.workout = req.body.workout;
  progress.image = finalImg;
  progress.save()
    .then((data) => res.status(200).json({ success: true, data: data }))
    .catch((err) => res.status(400).json({ success: false, error: err }));

});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
