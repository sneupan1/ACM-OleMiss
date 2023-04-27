const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://saurav:irock@cluster0.aq5rnsc.mongodb.net/?retryWrites=true&w=majority",
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
