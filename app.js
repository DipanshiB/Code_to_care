var express = require('express');
var app = express();
var multer  = require('multer')
var upload = multer()
var http = require('http');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
var port = 3000;
var hostname = '127.0.0.1';
var server = http.createServer(function(req, res){
  res.statusCode = 200;
});
// var router = express.Router();
// var passport = require('passport');
// var mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/xrays", {useNewUrlParser : true});
// mongoose.set('useFindAndModify', false);

var storage = multer.diskStorage({
  destination : function(req, file, callback){
    callback(null, './uploads');
  },
  filename : function(req, file, callback){
    callback(null, file.fieldname + '-' + Date.now() + '.png');
  }
});

var upload  = multer({storage : storage}).single('userPhoto');

app.get("/", function(req, res){
  res.sendfile(__dirname + "/views/index.html");
});
app.get("/submit", function(req, res){
  res.render("form.ejs");
});
app.post("/submit", function(req, res){
  upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.render("submitted.ejs");
    });
});
// var imageSchema = new mongoose.Schema({
//   title   : String,
//   path   : String,
//   img : {data : Buffer, contentType : String  },
//   created : {type : Date, default : Date.now()}
// });
// var Image = mongoose.model("Image", imageSchema);
// app.use(multer({ dest: ‘./uploads/’,
//  rename: function (fieldname, filename) {
//    return filename;
//  },
// }));


// app.get("/", function(req, res){
//   res.render("index.html");
// });

// app.post("/submit", function(req, res){
//   var name = req.body.name;
//   var email = req.body.email;
//   var path = req.body.path;
//   var img_data = req.body.img;
//   var created = req.body.created;
//   var newXray = {path : path, img : img, created : created};
//   Image.create(newXray, function(err, new){
//     if(err){
//       console.log(err);
//     }
//     else{
//       res.redirect("/submitted");
//     }
//   });
// });
//
//
//
// app.post(‘/api/photo’,function(req,res){
//  var newItem = new Item();
//  newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
//  newItem.img.contentType = ‘image/png’;
//  newItem.save();
// });

app.listen(3000,function(){
    console.log("Working on port 3000");
});
