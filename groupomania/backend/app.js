const express = require("express");
var bodyParser = require("body-parser");
const helmet = require("helmet");
const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
const rateLimit = require("express-rate-limit");



const app = express();
const postsRoutes = require("./routes/posts");
const usersRoutes = require("./routes/users");

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 5 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true,}));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(helmet());
app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);

module.exports = app;
