import { IArtist } from "./../types/schemeTypes";
import { Schema, model, SchemaTypes } from 'mongoose';

const artist = () => {
    const artistSchema = new Schema<IArtist>({
        name: {type: String, required: [true, "Name Required"], unique: true},
        realName: {type: String},
        profile: {type: String},
        websites: [
            {type: String, match: /^https?:\/\/\S+\.\S+$/}
        ],
        nicknames: [
            {type: Schema.Types.ObjectId, ref: "Artist"}
        ],
        groups: [
            {type: Schema.Types.ObjectId, ref: "Artist"}
        ],
        members: [
            {type: Schema.Types.ObjectId, ref: "Artist"}
        ],
        albums: [
            {type: Schema.Types.ObjectId, ref: "Album"}
        ],
        credits: [
            {type: Schema.Types.ObjectId, ref: "Album"}
        ]
    });
    const artistModel = model("Artist", artistSchema);
    return artistModel;
}

export default artist;