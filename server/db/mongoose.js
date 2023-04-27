const mongoose = require("mongoose");

mongoose
  .connect(
    process.env.DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("MongoDB has connected.");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
