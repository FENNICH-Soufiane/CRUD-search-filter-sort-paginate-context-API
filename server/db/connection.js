const mongoose = require("mongoose");

const dbConnection = async () => {
  await mongoose
    .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => console.log("server connect on dataBase "))
    .catch((err) => console.log("error to connected on dataBase : ", err));
};

module.exports = dbConnection;
