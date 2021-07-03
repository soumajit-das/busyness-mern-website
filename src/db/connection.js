const mongoose = require("mongoose");

// Creating a Database
mongoose
  .connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database connection successful!");
  })
  .catch((error) => {
    console.error("No database connection!");
    console.log(error);
  });
