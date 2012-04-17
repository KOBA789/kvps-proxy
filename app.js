var bouncy = require('bouncy');
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('death', function(worker) {
    console.log('worker ' + worker.pid + ' died');
  });
} else {
  bouncy(function (req, bounce) {
    bounce(req.headers.host, 80);
  }).listen(80);
}