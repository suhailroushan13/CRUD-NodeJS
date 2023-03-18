import fs from "fs/promises";
import url from "url";
import parser from "../util/parser.js";
export default async function putRoute(req, res) {
  let clientUrl = req.url
    .split("/")
    .filter((x) => x !== "")
    .join("/");
  console.log(clientUrl);

  let splits = clientUrl.split("/")[2];
  console.log(splits);

  if (clientUrl === "api/movies") {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end(JSON.stringify({ msg: "Route Not Found" }));
  } else {
    try {
      let outcome = await parser(req);
      console.log(outcome);

      if (outcome.title && outcome.year && outcome.genere && outcome.rating) {
        let data = req.movies;
        let findData = data.filter((x) => x.id === splits);

        let index = data.indexOf(findData[0]);
        console.log(index);

        delete data[index];
        findData.title = outcome.title;
        findData.year = outcome.year;
        findData.genere = outcome.genere;
        findData.rating = outcome.rating;

        let myNewArray = {
          id: splits,
          title: findData.title,
          year: findData.year,
          genere: findData.genere,
          rating: findData.rating,
        };
        data[index] = myNewArray;

        await fs.writeFile("./data/movies.json", JSON.stringify(req.movies));
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(req.movies));
      } else {
        res.end(
          JSON.stringify({ msg: "missing keys are title,year,genere,rating" })
        );
      }
    } catch (error) {
      console.log(error);

      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end(
        JSON.stringify({ msg: "missing keys are title,year,genere,rating" })
      );
    }
  }
}
