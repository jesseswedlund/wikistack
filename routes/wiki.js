const express = require("express");
const router = express.Router();
const { addPage } = require("../views");
const { Page } = require("../models");
const wikipage = require("../views/wikipage");
const main = require("../views/main");

router.get("/", async (req, res, next) => {
  const allPages = await Page.findAll();
  console.log("ALL PAGES >>>>>>>>>>>>>", allPages);
  res.send(main(allPages));
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
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get("/add", (req, res, next) => {
  res.send(addPage());
});

router.get("/:slug", async (req, res, next) => {
  const foundSlug = await Page.findOne({
    where: { slug: req.params.slug },
  });
  res.send(wikipage(foundSlug));
});

module.exports = router;
