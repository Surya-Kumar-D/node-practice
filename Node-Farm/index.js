const fs = require("fs");
const http = require("http");
const url = require("url");

////////////////////////////////////////////////////////////////////////////////////
//Blocking synchronous read and write
// const text = fs.readFileSync("./txt/input.txt", "utf-8");

// const textOut = `This is what we know about the avocado: ${text}.\nCreated on ${new Date()}`;

// fs.writeFileSync("./txt/output.txt", textOut);

// console.log("File created successfully.");

//Non-blocking synchronous read and write

// fs.readFile("./txt/start.tt", "utf-8", (err, data) => {
//   if (err) return console.log(err);
//   console.log(data);
//   fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("File created successfully. 😎");
//       });
//     });
//   });
// });

// console.log("Will Read the File");

////////////////////////////////////////////////////////////////////////////////////

//Server

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the overview page");
  } else if (pathName === "/product") {
    res.end("This is the product page");
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-own-header": "Hello World",
    });
    res.end("<h1>Page Not Found</h1>");
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
