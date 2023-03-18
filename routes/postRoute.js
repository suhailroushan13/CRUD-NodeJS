import fs from "fs/promises";
import parser from "../util/parser.js";
export default async function postRoute(req, res) {
  let clientUrl = req.url
    .split("/")
    .filter((x) => x !== "")
    .join("/");
  console.log(clientUrl);

  if (clientUrl !== "api/movies") {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end(JSON.stringify({ msg: "Route Not Found" }));
  } else {
    try {
      let outcome = await parser(req);

      if (
        !outcome.title ||
        !outcome.year ||
        !outcome.genere ||
        !outcome.rating
      ) {
        res.end(
          JSON.stringify({ msg: "missing keys are title,year,genere,rating" })
        );
      }

      outcome.id = String(
        Math.floor(Math.random() * 900000000000000) + 100000000000000
      );
      let myNewArray = {
        id: outcome.id,
        title: outcome.title,
        year: outcome.year,
        genere: outcome.genere,
        rating: outcome.rating,
      };
      let data = req.movies;
      req.movies.push(myNewArray);
      await fs.writeFile("./data/movies.json", JSON.stringify(req.movies));
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(req.movies));
    } catch (error) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end(
        JSON.stringify({ msg: "missing keys are title,year,genere,rating" })
      );
    }
  }
}
