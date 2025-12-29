require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/user");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

const seedUsers = async () => {
  try {
    await connectDB();

    await User.deleteMany();

    const users = [
      {
        email: process.env.ADMIN_EMAIL,
        password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10),
        role: "admin"
      },
      {
        email: process.env.MANAGER_EMAIL,
        password: await bcrypt.hash(process.env.MANAGER_PASSWORD, 10),
        role: "manager"
      }
    ];

    await User.insertMany(users);

    console.log("✅ Users seeded with hashed passwords");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedUsers();
