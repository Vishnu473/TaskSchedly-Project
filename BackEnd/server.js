//importing necessary modules
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const todoRoutes = require("./routes/todo");
const connectDB = require("./db");

//accessing PORT
const port = process.env.PORT || 3000;
//use for FrontEnd
app.use(cors());
//body parser
app.use(express.json());
//connect to db
connectDB();

//Using todo Apis using 'api/todo' route
app.use("/api/todo", todoRoutes);

app
  .listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  })
  .on("error", (err) => {
    console.error("Server failed to start:", err.message);
    process.exit(1);
  });
