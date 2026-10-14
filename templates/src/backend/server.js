const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/apiRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Load routes
app.use("/api/v1", apiRoutes);

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`CineTix Backend running on port ${PORT}`);
});
