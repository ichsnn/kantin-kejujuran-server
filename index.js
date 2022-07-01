const express = require("express");
const cors = require("cors");
const database = require("./database");
const routes = require("./routes");
const morgan = require('morgan');

const port = process.env.PORT || 5000;

const app = express();

app.use(morgan('dev'))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

database
  .sync({alter: true})
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.log("Error syncing database");
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
