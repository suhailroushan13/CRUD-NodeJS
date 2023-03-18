import fs from "fs/promises";
export default async function deleteRoute(req, res) {
  try {
    if (clientUrl !== "api/movies") {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end(JSON.stringify({ msg: "Route Not Found" }));
    } else {
      let clientUrlwithId = req.url
        .split("/")
        .filter((x) => x !== "")
        .join("/");

      console.log(`The Method is ${req.method}`);

      console.log(`The Total Part ${clientUrlwithId}`);

      let firstPart = clientUrlwithId.substr(0, 11);
      console.log(`The First Part ${firstPart}`);

      let secondPart = clientUrlwithId.substr(11);
      console.log(`The Second Part ${secondPart}`);
      let data = req.movies;

      let findId = data.filter((x) => x.id == secondPart);
      console.log(findId);

      let index = data.indexOf(findId[0]);
      console.log(index);

      data.splice(index, 1);
      await fs.writeFile("./data/movies.json", JSON.stringify(req.movies));
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(req.movies));
    }
  } catch (error) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end(
      JSON.stringify({ msg: "Route Not Found" })
    );
  }
}
