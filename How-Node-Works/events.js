const http = require("http");

const EventEmitter = require("events");

class Sales extends EventEmitter {
  constructor() {
    super();
  }

  newSales(stock) {
    this.emit("newSales", stock);
  }
}
const myEmitter = new Sales();

/////////////////////////////////////////////////////////////////////////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received!");
  res.end("Request Received!");
});

server.on("request", (req, res) => {
  console.log("Another request received!");
});

server.on("close", () => {
  console.log("Server closed!");
});

server.listen(3000, () => {
  console.log("Server listening on port 3000!");
});
