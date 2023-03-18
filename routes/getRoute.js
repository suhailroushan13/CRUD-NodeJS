import cluster from "cluster";
import fs from "fs";
import url from "url";
export default async function getRoute(req, res) {
  let clientUrl = req.url
    .split("/")
    .filter((x) => x !== "")
    .join("/");

  let clientUrlwithId = req.url
    .split("/")
    .filter((x) => x !== "")
    .join("/");

  // console.log(`The Method is ${req.method}`);

  // console.log(`The Total Part ${clientUrlwithId}`);

  let firstPart = clientUrlwithId.substr(0, 11);
  // console.log(`The First Part ${firstPart}`);

  let secondPart = clientUrlwithId.substr(11);
  // console.log(`The Second Part ${secondPart}`);
  let data = req.movies;

  // console.log(clientUrl, firstPart, secondPart);

  if (clientUrl === "api/movies") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  } else if (clientUrl.startsWith("api/movies/")) {
    const movie = data.find((m) => m.id === secondPart);
    if (movie) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(movie));
    } else if (
      !movie ||
      typeof movie.id !== "number" ||
      isNaN(movie.id) ||
      movie.id < 0
    ) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Movie not found");
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Method Not Allowed On Browser");
  }
}
