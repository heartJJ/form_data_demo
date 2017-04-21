 var fs = require('fs');
var express = require('express');
var multer  = require('multer')

var app = express();
var upload = multer();

var storage = multer.diskStorage({
     /**
      *设置上传后文件路径.
      * 若传入函数，需手动创建目录
      * 若传入字符串，则会自动创建
      */ 
      //   destination: function (req, file, cb) {
      //       cb(null, './public/uploads')
      //  }, 
      destination: './public/uploads',


     //给上传文件重命名，获取添加后缀名
      filename: function (req, file, cb) {
          var fileFormat = (file.originalname).split(".");
          // cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
          cb(null, file.originalname);
      }
 });  
     //添加配置文件到muler对象。
     var upload = multer({
          storage: storage
    });


// 单图上传
app.post('/upload', upload.single('logo'), function(req, res, next){
  var file = req.file;
    console.log(req.file);
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);

    console.log(req.body);
    res.send({ret_code: '0'});
});

app.get('/form', function(req, res, next){
    var form = fs.readFileSync('./form.html', {encoding: 'utf8'});
    res.send(form);
});


app.listen(3000);
console.log('server start');