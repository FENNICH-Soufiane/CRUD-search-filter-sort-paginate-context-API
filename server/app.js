require("dotenv").config();
const express = require("express");
const app = express();
const path = require('path');
const cors = require("cors");

const dbConnection = require("./db/connection");
const userRouter = require("./Routes/router")


const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
};


app.use('/static', express.static(path.join(__dirname, 'uploads')))
// app.use('/doc', express.static(path.join(__dirname, 'public/files')))
app.use('/files', express.static("./public/files"))

app.use(cors(corsOptions))
app.use(express.json());




app.use('/', userRouter)

app.get("/", (req, res) => {
  res.status(200).send("server start");
});


const PORT = 8080;
const startServer = async () => {
  try {
    await dbConnection(); // Establish the database connection

    app.listen(PORT, () => {
      console.log("Server is running on port:", PORT);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();
