export default async function getRoute(req, res) {
  let getUrl = "/api/movies";

  let id = req.url.split("/")[3];
  let routeCheck = req.url.substr(0, 12);

  let check = req.movies.filter((x) => {
    return x.id == id;
  });

  if (req.url === getUrl) {
    res.statusCode = 200;
    res.end(JSON.stringify(req.movies));
  } else if (req.url === routeCheck || id == check[0].id) {
    res.statusCode = 200;
    res.end(JSON.stringify(check[0]));
  } else {
    res.statusCode = 400;
    res.end(JSON.stringify({ err: "Not Correct Route" }));
  }
}
