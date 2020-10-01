const express = require("express");
const router = express.Router();
const { addPage } = require("../views");
const { Page } = require("../models");

router.get("/", (req, res, next) => {
  res.send("../views/addPage");
});

router.post("/", async (req, res, next) => {
  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  try {
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
    });

    // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

router.get("/add", (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
