const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
require("./db/mongoose"); //connect mongoDB

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.use("/api/user", require("./router/user"));
app.use("/api/user", require("./router/officer"));
app.use("/api/user", require("./router/admin"));
app.use("/api/profile", require("./router/profile"));
app.use("/api/event", require("./router/event"));
app.use((req, res) => {
  res.status(404).send([{ message: "page not found" }]);
});

app.listen(PORT, () => {
  console.log("Server is running at port ", PORT);
});
