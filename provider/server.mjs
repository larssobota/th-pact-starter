import express from "express";
import fs from "node:fs";

const app = express();

app.get("/status/", (req, res) => {
  if (fs.existsSync("service-unavailable.txt")) {
    return res.status(503).send();
  }
  return res.status(200).send();
});

export function startServer(port) {
  return app.listen(port, () => {
    console.log(`Provider service running on http://localhost:${port}`);
  });
}
