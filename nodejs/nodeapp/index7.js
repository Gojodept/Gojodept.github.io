import express from "express";
const app = express();
app.use("/images", express.static("images"));
app.use(express.static("public"));
app.listen(8080, () => {
  console.log("Hello World");
});
app.get("/products", (req, res) => {
  res.send("Product List");
});