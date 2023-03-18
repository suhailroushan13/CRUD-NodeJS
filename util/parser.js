export default async function parser(request) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      request.on("data", (data) => {
        body += data;
      });
      request.on("end", () => {
        resolve(JSON.parse(body));
      });
    } catch (error) {
      reject(error);
    }
  });
}
