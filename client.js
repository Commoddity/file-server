const net = require('net');
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const socket = net.createConnection({port: 8000, host: 'localhost' });
socket.on('connect', () => {
  socket.on('data', data => {
    console.log('Succesfully received file from server.');
    rl.question("Enter path to save file (use extension .txt): ", (filePath) => {
      fileWriter(filePath, data);
      console.log(`Saved file to path: ${filePath}`);
    });
  });

});

const fileRequest = (path) => {
  socket.write(path);
};

const fileWriter = (path, body) => {
  fs.writeFile(path, body, (err) => {
    if (err) throw err;
  })
};

setTimeout(() => {
  rl.question("Enter file path to request: ", (filePath) => {
    fileRequest(filePath);
  });
}, 500);