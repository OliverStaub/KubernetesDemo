const http = require("http");
const os = require("os");

let requestCount = 0;

const server = http.createServer((req, res) => {
  requestCount++;
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`
    <html>
      <head>
        <title>Kubernetes Demo</title>
        <style>
          body { font-family: Arial; text-align: center; margin-top: 50px; }
          .container { display: inline-block; border: 1px solid #ddd; padding: 20px; border-radius: 5px; }
          .count { font-size: 30px; font-weight: bold; }
          .hostname { margin: 10px 0; color: #333; }
          .status { color: green; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Kubernetes Demo App</h1>
          <p>Request count: <span class="count">${requestCount}</span></p>
          <p class="hostname">Running on pod: ${os.hostname()}</p>
          <p class="status">Status: v1 - Running normally</p>
        </div>
      </body>
    </html>
  `);
});

server.listen(8080, () => {
  console.log("Server running on port 8080");
});
