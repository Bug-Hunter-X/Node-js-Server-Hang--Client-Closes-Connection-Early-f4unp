const http = require('http');

const server = http.createServer((req, res) => {
  //Simulate a long-running task
  let count = 0;
  const interval = setInterval(() => {
    count++;
    console.log('count:', count);
    if (count >= 5) {
      clearInterval(interval);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello World!');
    }
  }, 1000);

  //This will cause the response to hang because the 'end' event is called after the response is already closed.
  req.on('close', () => {
    console.log('Request closed');
    clearInterval(interval);
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});