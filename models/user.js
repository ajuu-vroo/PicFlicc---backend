const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username cannot be empty."],
    },
    email: {
      type: String,
      required: [true, "Email ID cannot be empty."],
      unique: true,
      validate: [isEmail, "Please enter a valid Email ID."],
    },
    password: {
      type: String,
      required: [true, "Password cannot be empty."],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        default: "picflicc_id",
      },
      url: {
        type: String,
        default: "picflicc_url",
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = model("User", userSchema);
