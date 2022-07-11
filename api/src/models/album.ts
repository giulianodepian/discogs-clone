import { IAlbum } from "./../types/schemeTypes";
import { Schema, model } from 'mongoose';

const albumSchema = new Schema<IAlbum>({
    name: { type: String, required: [true, "Need to have a title!"] },
    artists: [
        { type: Schema.Types.ObjectId, ref: "Artists", required: [true, "Artist Required"] }
    ],
    labels: [{
        label: { type: Schema.Types.ObjectId, ref: "Label", required: [true, "Label Required"] },
        catalogNumber: { type: String, required: [true, "Catalog Number Required"] }
    }],
    format: { type: Schema.Types.ObjectId, ref: "Format", required: [true, "Format Required"] },
    formatEditors: [
        { type: Schema.Types.ObjectId, ref: "FormatEditor" },
    ],
    country: { type: String },
    date: { type: Schema.Types.Date },
    tracks: [{
        number: { type: String, required: [true, "Missing Track Number"] },
        title: { type: String, required: [true, "Missing Title Track"] },
        duration: { type: String },
    }],
    credits: [{
        musician: { type: Schema.Types.ObjectId, ref: "Artist", required: [true, "Missing Musician"] },
        instruments: { type: String, required: [true, "Missing Instruments"] },
        tracks: { type: String },
    }],
    genres: [
        { type: Schema.Types.ObjectId, ref: "Genre", required: [true, "Missing Genre"] }
    ],
    styles: [
        { type: Schema.Types.ObjectId, ref: "Style" }
    ],
    notes: { type: String },
    images: [{
        data: { type: Buffer },
        contentType: { type: String },
    }],
    isMaster: { type: Boolean, required: [true, "Required if is a master or no"], default: false },
    master: { type: Schema.Types.ObjectId, ref: "Album" },
    postedBy: [
        { type: Schema.Types.ObjectId, ref: "User" }
    ],
    ownedBy: [
        { type: Schema.Types.ObjectId, ref: "User" }
    ],
    wishedBy: [
        { type: Schema.Types.ObjectId, ref: "User" }
    ],
});

const albumModel = model<IAlbum>("Album", albumSchema);

export default albumModel;