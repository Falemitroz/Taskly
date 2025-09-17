require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./models");
const errorHandler = require("./middlewares/ErrorHandler");

const usersRouter = require("./routers/Users");

const CLIENT_URL =
  process.env.ENV === "mobile"
    ? process.env.CLIENT_URL_MOBILE
    : process.env.CLIENT_URL_LOCAL;

app.use(express.json());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(cookieParser());

// Serve static files from the uploads directory (*)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/users", usersRouter);

// Global error handler
app.use(errorHandler);

db.sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(process.env.PORT || 5000, "0.0.0.0", () =>
      console.log(
        `Server running on port ${
          process.env.PORT || 5000
        } and serving client at ${CLIENT_URL}`
      )
    );
  })
  .catch((err) => {
    console.error(err);
  });
