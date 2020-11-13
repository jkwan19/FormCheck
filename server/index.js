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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `.${destination}`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({storage});

app.use(cors());
// app.use(upload.single('image'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/../client/dist'));


app.get('/progress', function (req, res) {
  const selectAll = (callback) => {
    Progress.find({}, function(err, data) {
      if(err) {
        return res.sendStatus(500);
      } else {
        return res.json(data);
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
  console.log(req.file, req.body.workout, req.body.image)
  if (!req.file && !req.body.image) return res.send('Please upload a file');
  const image = req.file.path;
  let progress = new Progress();
  progress.workout = req.body.workout;
  progress.image = image ? image : req.body.image.name;
  progress.save()
    .then((data) => res.status(200).json({ success: true, data: data }))
    .catch((err) => res.status(400).json({ success: false, error: err }));

});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
