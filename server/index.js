const express = require('express');
const bodyParser = require('body-parser');
const morgan = require("morgan");
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
    cb(null, path.join(__dirname, `/../${destination}`))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

// app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));
app.use(express.static(__dirname + `/../${destination}`));

app.set("view engine", "ejs");

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

app.get('/upload', function(req, res){
  res.json(data, 'test')
});

app.post('/upload', upload.single('image'), function (req, res) {
  const file = req.file
  console.log(file, req.body.workout, 'test')
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }

  let progressObj = {
    workout: req.body.workout,
    image: {
      data: fs.readFileSync(path.join(__dirname + '/../public/uploads/' + file.filename)),
      contentType: 'image/png'
    }
  };
  Progress.create(progressObj, (err, data) => {
    if (err) {
      console.log(err);
    }
    else {
      // item.save();
      res.redirect('/');
    }
  });

});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
