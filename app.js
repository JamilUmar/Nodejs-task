var http = require('http');
var path = require('path');
var fs = require('fs');
var url = require('url');



const server = http.createServer(function (req, res) {
  let body = '';


  if (req.url == '/') {
    fs.readFile(path.join(__dirname, 'form.html'), (err, data) => {
      if (err) throw err;
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      req.on('end', () => {
        fs.appendFileSync('./message.txt', JSON.stringify(body), (err) => {
          console.log(err);
        });
      });
      req.on('data', function (chunk) {
        body += chunk;
      });
      res.end(data);
    });
  }

});



const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`server running on port ${port}`);
});