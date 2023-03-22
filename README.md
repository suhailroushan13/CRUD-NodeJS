# NodeJS RestFull CRUD API Project | No Framework or Library

## CRUD Application Using Plain NodeJS

This application is a simple implementation of the CRUD (Create, Read, Update, Delete) operations using plain NodeJS without any frameworks or libraries.

### Project Setup

1. Create a new directory for the project and navigate into it using the terminal.

2. Initialize a new NodeJS project by running the following command:


### Implementation

1. Create a new file `index.js` and add the following code:

```javascript
import http from "http";
import url from "url";
import fs from "fs/promises";
import getRoute from "./routes/getRoute.js";
import postRoute from "./routes/postRoute.js";
import deleteRoute from "./routes/deleteRoute.js";
import putRoute from "./routes/putRoute.js";

const port = 8000;

let main = async () => {
  let server = http.createServer(async (req, res) => {
    let method = req.method;

    let data = await fs.readFile("./data/movies.json", "utf-8");
    req.movies = JSON.parse(data);

    switch (method) {
      case "GET":
        getRoute(req, res);
        break;
      case "POST":
        postRoute(req, res);
        break;
      case "PUT":
        putRoute(req, res);
        break;
      case "DELETE":
        deleteRoute(req, res);
        break;
      default:
        res.end(JSON.stringify({ msg: "Method Not Allowed" }));
        break;
    }
  });

  server.listen(port, () => {
    console.log(`Server Listening at Port ${port}`);
  });
};

main();
```

## Routes
```bash
GET      /api/movies
POST     /api/movies
GET      /api/movies/:id
PUT      /api/movies/:id
DELETE   /api/movies/:id

```

## Installation
```bash
git clone git@github.com:suhailroushan13/CRUD-NodeJS.git
# Install dependencies
npm install
# Run App
npm start
```
