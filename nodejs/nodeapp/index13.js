// import express from "express";
// import mongoose from "mongoose";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// const SECRET = "something";
// const app = express();
// const userRouter =express.Router();
// app.use(express.json());
// mongoose.connect("mongodb://localhost:27017/lpu").then(() => {
//   app.listen(8080, () => {
//     console.log("Server started");
//   });
// });

// const authenticate = (req, res, next) => {
//   try {
//     let token = req.headers.authorization;
//     token = token.split(" ")[1];
//     const user = jwt.verify(token, SECRET);
//     req.role = user.role;
//     next();
//   } catch (err) {
//     return res.json({ message: "Access Denied" });
//   }
// };

// const authorize = (role) => {
//   return (req, res, next) => {
//     if (req.role === role) {
//       next();
//     } else {
//       return res.json({ message: "Unauthorized Access" });
//     }
//   };
// };

// const userSchema = mongoose.Schema(
//   {
//     username: { type: String },
//     email: { type: String, unique: true },
//     password: { type: String },
//     role: { type: String, default: "user" },
//   },
//   { timestamps: true }
// );
// const userModel = mongoose.model("User", userSchema);
// userRouter.post("/register", async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const hashedpwd = await bcrypt.hash(password, 10);
//     const user = {
//       username,
//       email,
//       password: hashedpwd,
//     };
//     const result = await userModel.create(user);
//     res.status(201).json(result);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// });

// userRouter.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const existingUser = await userModel.findOne({ email });
//     if (existingUser) {
//       const isMatch = await bcrypt.compare(password, existingUser.password);
//       if (isMatch) {
//         const userObj = {
//           username: existingUser.username,
//           email: existingUser.email,
//           role: existingUser.role,
//         };
//         const token = jwt.sign(userObj, SECRET, { expiresIn: "1h" });
//         res.status(200).json({ user: userObj, token });
//       } else {
//         res.status(400).json({ message: "Invalid Password" });
//       }
//     } else {
//       res.status(400).json({ message: "User not found" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// });

// userRouter.get("/showusers", authenticate, authorize("admin"), async (req, res) => {
//   try {
//     const result = await userModel.find();
//     res.status(200).json(result);
//   } catch (err) {}
// });

// userRouter.patch("/:id", authenticate, authorize("admin"), async (req, res) => {
//   try {
//     const id = req.params.id;
//     const body = req.body;
//     const result = await userModel.findByIdAndUpdate(id, body);
//     res.status(200).json(result);
//   } catch (err) {
//     console.log(err);
//     res.status.apply(400).json("Something went wrong");
//   }
// });

// userRouter.delete("/:id", authenticate, authorize("admin"), async (req, res) => {
//   try {
//     const id = req.params.id;
//     const result = await userModel.findByIdAndDelete(id);

//     return res.status(404).json({ message: "User not found" });

//     res.status(200).json({ message: "User deleted", user: result });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ message: "Something went wrong" });
//   }
// });

// userRouter.get("/:id/profile", authenticate, async (req, res) => {
//   try {
//     const id = req.params.id;
//     const result = await userModel.findOne({ _id: id });
//     res.status(200).json(result)
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ message: "Something went wrong" });
//   }
// });

// app.use("/api/users",userRouter);

//original file divided into userController.js ,userModel.js, auth.js , userRoute.js
import express from "express";
import mongoose from "mongoose";
import userRouter from "./userRoute.js";
const app = express();
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/lpu").then(() => {
  app.listen(8080, () => {
    console.log("Server started");
  });
});
app.use("/api/users", userRouter);