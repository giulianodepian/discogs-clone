import { IGenre } from "./../types/schemeTypes";
import { Schema, model } from 'mongoose';

const genre = () => {
    const genreSchema = new Schema<IGenre>({
        name: {type: String, required: [true, "Missing name"]},
        description: {type: String}
    })

    const genreModel = model("Genre", genreSchema);
    return genreModel;
}

export default genre;