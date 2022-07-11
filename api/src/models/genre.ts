import { IGenre } from "./../types/schemeTypes";
import { Schema, model } from 'mongoose';

const genreSchema = new Schema<IGenre>({
    name: { type: String, required: [true, "Missing name"] },
    description: { type: String }
})

const genreModel = model<IGenre>("Genre", genreSchema);


export default genreModel;