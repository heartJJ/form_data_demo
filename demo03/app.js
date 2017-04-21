const Koa = require('koa');
const route = require('koa-router')();
const multer = require('koa-multer');

const app = new Koa();
// const upload = multer();

const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({
  storage: storage
});

app.use(route.routes());

route.get('/form', (ctx, next) => {
  ctx.response.body = `<form action="/upload" method="post" enctype="multipart/form-data">
    <h2>单图上传</h2>
    <input type="text" name="logo">
    <input type="file" name="logo">
    <input type="submit" value="提交">
</form>`;
});

route.post('/upload', upload.single('logo'), (ctx, next) => {
  console.log(ctx.req.file);
  console.log(ctx.req.body);
  ctx.response.body = '操作成功';
});

app.listen(3000);