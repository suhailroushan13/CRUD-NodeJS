import http from "http";
import url from "url";
import dotenv from "dotenv";
dotenv.config();
import getRoute from "./routes/get.js";
import postRoute from "./routes/post.js";
import putRoute from "./routes/put.js";
import deleteRoute from "./routes/delete.js";
import fs from "fs/promises";

const port = process.env.PORT || 5001;

let main = async () => {
  let server = http.createServer(async (req, res) => {
    let urlParsed = url.parse(req.url, true);
    let route = urlParsed.pathname;
    let method = req.method;
    let data = await fs.readFile("./data/movies.json", "utf-8");
    req.movies = JSON.parse(data);

    switch (method) {
      case "GET":
        getRoute(req, res);
        break;
      case "POST":
        break;
      case "PUT":
        break;
      case "DELETE":
        break;
      default:
        res.end(JSON.stringify({ msg: "No Method Found" }));
        break;
    }
  });
  server.listen(port, () => {
    console.log(`Server Running at port ${port}`);
  });
};

main();
