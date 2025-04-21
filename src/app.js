// Create server using HTTP
const http = require("http");

const app = http.createServer((req, res) => {
  res.end("hi");
});

// app.get('/', (req, res) => res.send('hi'));
app.listen(4000, () => {
  console.log(`Server is running at http://localhost:4000`);
});
