const net = require('net');
const fs = require('fs');

const server = net.createServer();

server.on('connection', function(socket) {
  console.log('A new connection has been established.');

  socket.on('data', function(request) {
    console.log('Requested file path: ' + request);
    fileReader(request);
  });

  socket.on('end', function() {
      console.log('Closing connection with the client');
  });

  socket.on('error', function(err) {
      console.log(`Error: ${err}`);
  });

  const fileReader = (path) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      socket.write(data);
    })
  };

}); 

server.listen(8000, () => {
  console.log('Server listening on Port 8000');
});