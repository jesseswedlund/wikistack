const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const layout = require("./views/layout");
const { db, Page, User } = require("./models");
const wikiRouter = require("./routes/wiki");
const userRouter = require("./routes/users");

const staticMiddleware = express.static(path.join(__dirname, "public"));

app.use(staticMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use("/wiki", wikiRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.redirect("/wiki");
});

db.authenticate().then(() => {
  console.log("connected to the database");
});

const PORT = 3000;

const init = async () => {
  await db.sync(); // {force: true} if you want to make changes to tables
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init();
