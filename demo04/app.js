const restify = require('restify');
const fs = require('fs');
const path = require('path');

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

server.use(restify.queryParser());
server.use(restify.bodyParser(
  {
    maxBodySize: 0,
    mapParams: true,
    mapFiles: false,
    overrideParams: false,
    multipartHandler: function(part, req) {
      let chunks = [],
        size = 0;
      part.on('data', function(data) {
        /* do something with the multipart data */
        chunks.push(data);
        size += data.length;
      });

      part.on('end', () => {
        const buf = Buffer.concat(chunks, size);
        req.params[part.name] = buf.toString();
        console.log(buf.toString());
      });
    }
    // multipartFileHandler: function(part, req) {
    //   let ws = fs.createWriteStream(`./public/upload/${part.filename}`),
    //     size = 0;
    //   part.on('data', function(data) {
    //     ws.write(data);
    //     size += data.length;
    //   });

    //   part.on('end', () => {
    //     console.log(size);
    //   });
    // }
    // keepExtensions: false,
    // uploadDir: os.tmpdir(),
    // multiples: true,
    // hash: 'sha1'
  }
));
// server.get('/echo/:name', function (req, res, next) {
//   res.send(req.params);
//   return next();
// });

server.post('/upload', (req, res, next) => {
  console.log(req.params);
  res.send({
    name: req.params.name,
    age: req.params.age
  });
});

server.on('uncaughtException', function (req, res, route, err) {
  /// log.error(err);
  console.log(err);
  res.send(503, {statusCode: -5001});
});


server.listen(3000, function () {
  console.log('%s listening at %s', server.name, server.url);
});