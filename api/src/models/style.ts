import { IStyle } from "./../types/schemeTypes";
import { Schema, model } from 'mongoose';

const style = () => {
    const styleScheme = new Schema<IStyle>({
        name: {type: String, required: [true, "Missing name"]},
        description: {type: String}
    })

    const styleModel = model("Style", styleScheme);
    return styleModel;
}

export default style;