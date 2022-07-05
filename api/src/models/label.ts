import { ILabel } from "./../types/schemeTypes";
import { Schema, model } from 'mongoose';

const label = () => {
    const labelSchema = new Schema<ILabel>({
        name: {type: String, required: [true, "Missing Name"]},
        profile: {type: String},
        subLabels: [
            {type: Schema.Types.ObjectId, ref: "Label"}
        ],
        parentLabel: {type: Schema.Types.ObjectId, ref: "Label"},
        contactInformation: {type: String},
        websites: [
            {type: String, match: /^https?:\/\/\S+\.\S+$/}
        ],
        albums: [
            {type: Schema.Types.ObjectId, ref: "Album"}
        ]
    });
    const labelModel = model("Label", labelSchema);
    return labelModel;
}

export default label;