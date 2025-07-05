import express from "express";

const Router = express.Router();

Router.get("/show", (req, res) => {
  res.send("Show User");
});

Router.post("/register", (req, res) => {
  res.send("Register");
});

Router.post("/login", (req, res) => {
  res.send("Login Sucess");
});

export default Router;
