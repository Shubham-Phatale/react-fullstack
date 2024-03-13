const express = require("express");
const cors = require("cors");
const User = require("./db/mongodb");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/users", async () => {});

app.post("/api/users", async (req, res) => {
  try {
    const isExistingUser = await User.findOne({ phone: req.body.phone });
    console.log(isExistingUser);
    if (!isExistingUser) {
      const user = await User.create(req.body);
      res.status(200).json({ message: "User Added Successfully" });
      console.log("if");
    } else {
      res.status(200).json({ message: "User Already exists" });
      console.log("else");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("error");
  }
});

app.listen(8000, () => {
  console.log("port connected");
});
