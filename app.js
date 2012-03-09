var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var KvpsProxy = require('./lib');

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('death', function(worker) {
    console.log('worker ' + worker.pid + ' died');
  });
} else {
  KvpsProxy.listen(8124);
}
