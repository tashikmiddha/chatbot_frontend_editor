const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connectDB = require("./utils/db");

dotenv.config();

// Fail fast with a clear error if required env vars are missing
if (!process.env.MONGO_URI) {
  console.warn("Warning: MONGO_URI is not set. Create server/.env from server/.env.example");
}
if (!process.env.JWT_SECRET) {
  console.warn("Warning: JWT_SECRET is not set. Create server/.env from server/.env.example");
}

connectDB();

const app = express();

app.use(
  cors({
    origin:"*",
    credentials: true,
  })
);

app.use(express.json());
app.use(
  "/widget",
  express.static(
    path.join(__dirname, "public/widget")
  )
);
app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/bot",
  require("./routes/botRoutes")
);
app.use(
  "/api/public",
  require("./routes/publicRoutes")
);
app.get("/", (req, res) => {
  res.send("Chatbot SaaS API Running...");
});

const PORT =
  process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(
    `Server running on ${PORT}`
  );
});