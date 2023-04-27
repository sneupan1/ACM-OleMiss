const express = require("express");
const app = express();
const axios = require("axios");
const path = require("path");
const cors = require("cors");
require("./db/mongoose"); //connect mongoDB

const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => res.send("Server is healthy"));
app.use("/api/user", require("./router/user"));
app.use("/api/user", require("./router/officer"));
app.use("/api/user", require("./router/admin"));
app.use("/api/profile", require("./router/profile"));
app.use("/api/event", require("./router/event"));

app.listen(PORT, () => {
  console.log("Server is running at port ", PORT);
});
