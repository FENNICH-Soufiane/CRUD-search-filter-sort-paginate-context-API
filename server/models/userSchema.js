const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator")

const userSchema = new Schema({
  fname: {
    type:String,
    required: true,
    trim: true
  },
  lname: {
    type:String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email address');
      }
    }
  },
  mobile: {
    type:String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 10
  },
  gender: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true
  },
  profile: {
    type: String,
    required: true
  },
  location: {
    type:String,
    required: true
  },
  // dateCreated: {
  //   type: Date,
  //   default: Date.now,
  //   required: true,
  // },
  // dateUpdated: {
  //   type: Date,
  //   default: Date.now,
  //   required: true,
  // },
  dateCreated: Date,
  dateUpdated: Date
}, 
// à la place de timestamps je vais declarer created et updated manually
// { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
