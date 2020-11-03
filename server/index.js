const express = require('express');
const bodyParser = require('body-parser');
const Progress = require('../database/index.js');
const upload = require('./ImageUploader.js')
const singleUpload = upload.single("image");
const app = express();
const cors = require("cors");

const fs = require('fs');
const path = require('path');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

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

// app.post('/progress', function (req, res) {
//   let progress = new Progress(req.body);
//   const create = ((callback) => {
//     progress.save((err, data) => {
//       if (err) {
//         console.log('error posting:', err);
//       } else {
//         res.send(data)
//       }
//     })
//   })
//   create((err, data) => {
//     if (err) {
//       res.sendStatus(500)
//     } else {
//       console.log('posted')
//     }
//   })
// })

app.post('/progress', function (req, res) {
  singleUpload(req, res, function (err) {
    if (err) {
      return res.json({
        success: false,
        errors: {
          title: "Image Upload Error",
          detail: err.message,
          error: err,
        },
      });
    }
  });
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
  });
});

app.listen(3000 || process.env.PORT, function() {
  console.log('listening on port 3000!');
});

