const mongoose = require("mongoose");
const { genSalt, hash, compare } = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      trim: true,
      // required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
    },
    address: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    token: {
      type: String,
      default: ''
      // required: true,
    },
  },
  { timestamps: true }
);

// Before saving the user, hash the password
// eslint-disable-next-line func-names
userSchema.pre("save", async function (next) {
  try {
    const user = this;
    const salt = await genSalt(+process.env.PASS_SALT_ROUND);
    user.password = await hash(user.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// eslint-disable-next-line func-names
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await compare(candidatePassword, this.password);
};

// Omit the password when returning a user
userSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret.password;
    // eslint-disable-next-line no-underscore-dangle
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Users", userSchema);
