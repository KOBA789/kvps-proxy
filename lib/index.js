var httpProxy = require('http-proxy');

var options = {
  maxSockets: 2048,
  hostnameOnly: true,
  router: {
    'koba789.com': '192.168.12.1',
    'oidong1.kvps.me': '192.168.12.2',
    'localhost': 'localhost:9861'
  }
};

var proxyServer = httpProxy.createServer(options);

module.exports = proxyServer;