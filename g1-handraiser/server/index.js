const express = require("express");
const massive = require("massive");
const cors = require("cors");

massive({
  host: "localhost",
  port: 5432,
  database: "handraiser",
  user: "postgres",
  password: "handraiser"
}).then(db => {
  const app = express();

  app.set("db", db);

  app.use(express.json());
  app.use(cors());

  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
