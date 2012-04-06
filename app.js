var bouncy = require('bouncy');

bouncy(function (req, bounce) {
  bounce(req.headers.host, 80);
}).listen(80);