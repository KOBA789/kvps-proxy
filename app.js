var bouncy = require('bouncy');
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

function logWithDate(message) {
  console.log((new Date).toString(), message);
}

if (cluster.isMaster) {
  process.on('uncaughtException', function (err) {
    logWithDate(err.toString());
  });

  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('death', function(worker) {
    logWithDate('worker ' + worker.pid + ' died');
    cluster.fork();
  });
} else {
  logWithDate('worker(pid:' + process.pid + ') is starting...');
  bouncy(function (req, bounce) {
    bounce(req.headers.host, 80);
  }).on('clientError', function (err) {
    logWithDate(err.toString());
  }).listen(8124);
}