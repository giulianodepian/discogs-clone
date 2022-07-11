import { IStyle } from "./../types/schemeTypes";
import { Schema, model } from 'mongoose';

const styleScheme = new Schema<IStyle>({
    name: { type: String, required: [true, "Missing name"] },
    description: { type: String }
})

const styleModel = model<IStyle>("Style", styleScheme);

export default styleModel;