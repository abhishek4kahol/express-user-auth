const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema =new mongoose.Schema({
  email:{
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  name:{
    type: String,
    required: true,
    trim: true
  },
  favoriteBook:{
    type: String,
    required: true,
    trim: true
  },
  password:{
    type: String,
    required: true
  }
});
//hash password before saving to database
// UserSchema.pre('save', (next) => {
//   const user = this;
//   console.log('user:',user, this.password);
//   bcrypt.genSa lt(10, (err,salt) => {
//     if(err) {
//       return next(err);
//     }
//     bcrypt.hash(user.password, salt, (err, hash) => {
//       if(err) {
//         return next(err);
//       }
//       user.password = hash;
//       console.log('log',user.password, hash);
//       next();
//     });
//   });
// });

//authenticate input against database documents
UserSchema.statics.authenticate = (email,password,callback) =>{
  User.findOne({
    email: email
  }).exec((err,user) =>{
    if(err) {
      return callback(err);
    } else if (!user) {
      var err = new Error('User not found.');
      err.status =401;
      return callback(err);
    }
    return callback(null,user);
  })
}

const User = mongoose.model('myuser', UserSchema);
module.exports = User;
