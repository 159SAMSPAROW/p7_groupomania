const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validate: [isEmail],//appel de validator pour vérifier l' email
      lowercase: true,
      unique: true,
      trim: true,// retirer les espaces
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6
    },
    picture: {
      type: String,
      default: "./uploads/profil/icon.png"
    },
    bio :{
      type: String,
      max: 500,
    },
    admin: { type: Boolean, default: false },
    likes: {
      type: [String]
    }
  },
  {
    timestamps: true,//Permet  d 'enregister l' heure de création
  }
);

// play function before save into display: 'block',
userSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email')
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;