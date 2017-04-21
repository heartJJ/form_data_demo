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
        
          // var fileFormat = (file.originalname).split(".");
          // cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
          cb(null, file.originalname);
      }
 });  
     //添加配置文件到muler对象。
     var upload = multer({
          storage: storage
    });


// 多图上传
app.post('/upload/muti', upload.array('logo', 2), function(req, res, next){
    // console.log(req.files);
    res.send({ret_code: '0'});
});

app.get('/form/muti', function(req, res, next){
    var form = fs.readFileSync('./form_muti.html', {encoding: 'utf8'});
    res.send(form);
});


app.listen(3000);
console.log('server start');