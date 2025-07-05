import express from "express";
import userRouter from "./userRoute.js";
import productRouter from "./productRoute.js";
const app = express();
app.listen(8080, () => {
  console.log("Server started");
});
app.use("/api/users",userRouter)
app.use("/api/products",productRouter)