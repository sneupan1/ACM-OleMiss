const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://sneupan1:Nepal123@cluster0.ygal0.mongodb.net/ACM?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log("MongoDB has connected.");
  }
);
