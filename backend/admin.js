require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User"); // Adjust path if needed
mongoose.connect(process.env.MONGO_URI);// add yuor mongobd Link

const setAdmin = async () => {
  await User.findOneAndUpdate(
    { email: "nileshparmar2828@gmail.com" }, // Change to your admin email
    { role: "admin" }
  );
  console.log("Admin role assigned");
  mongoose.disconnect();
};

setAdmin();
