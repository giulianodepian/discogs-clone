import { IUser } from "./../types/schemeTypes";
import { Schema, model} from 'mongoose';

const user = () => {
    const userSchema = new Schema<IUser>({
        username: {type: String, required: [true, "Username Required"], unique: true},
        password: {type: String, required: [true, "Password Required"]},
        realName: {type: String},
        profile: {type: String},
        ubication: {type: String},
        website: {
            type: String,
            match: /^https?:\/\/\S+\.\S+$/,
        },
        image: {
            data: Buffer,
            contentType: String
        },
        albumsPosted: [
            {type: Schema.Types.ObjectId, ref: "Album"}
        ],
        artistsPosted: [
            {type: Schema.Types.ObjectId, ref: "Artist"}
        ],
        labelsPosted: [
            {type: Schema.Types.ObjectId, ref: 'Label'}
        ],
        albumsOwned: [
            {type: Schema.Types.ObjectId, ref: "Album"}
        ],
        albumsWished: [
            {type: Schema.Types.ObjectId, ref: "Album"}
        ],
        isAdmin: {type: Boolean, default: false, required:[true, "Missing admin status"]}
    });

    const userModel = model("User", userSchema);
    return userModel;
}

export default user;