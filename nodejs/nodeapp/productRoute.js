import express from "express";

const Router = express.Router();

Router.get("/show", (req, res) => {
  res.send("Show Products");
});

Router.delete("/:id", (req, res) => {
  res.send("Delete product 1");
});

export default Router;
