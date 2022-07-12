import { IUser } from "./../types/schemeTypes";
import mongoose, { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
const saltRounds = 10;

const userSchema = new Schema<IUser>({
    username: { type: String, required: [true, "Username Required"], unique: true, lowercase: true },
    password: { type: String, required: [true, "Password Required"] },
    email: { type: String, required: [true, "Email Required"], unique: true, lowercase: true, match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ },
    realName: { type: String },
    profile: { type: String },
    ubication: { type: String },
    website: {
        type: String,
        match: /^https?:\/\/\S+\.\S+$/,
    },
    image: {
        data: Buffer,
        contentType: String
    },
    albumsPosted: [
        { type: Schema.Types.ObjectId, ref: "Album" }
    ],
    artistsPosted: [
        { type: Schema.Types.ObjectId, ref: "Artist" }
    ],
    labelsPosted: [
        { type: Schema.Types.ObjectId, ref: 'Label' }
    ],
    albumsOwned: [
        { type: Schema.Types.ObjectId, ref: "Album" }
    ],
    albumsWished: [
        { type: Schema.Types.ObjectId, ref: "Album" }
    ],
    isAdmin: { type: Boolean, default: false, required: [true, "Missing admin status"] }
});

userSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = function (candidatePassword: string, cb: any) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.path('email').validate(async function(value: string) {
    const emailCount = await mongoose.models.User.findOne({email: value})
    return !emailCount;
}, "Email Already Exist");

userSchema.path('username').validate(async function(value: string) {
    const userCount = await mongoose.models.User.findOne({username: value})
    return !userCount;
}, "Username Already Exist");

const userModel = model<IUser>("User", userSchema)

export default userModel;