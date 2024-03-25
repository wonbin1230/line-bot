import type { Connection, Model } from "mongoose";

import { Schema } from "mongoose";

const imageTempModelSchema = (mongoose: Connection): Model<IImageTemp> => {
    return mongoose.model<IImageTemp>("Imagetemp", imageTempSchema);
};

export interface IImageTemp {
    dataURL: string,
    createAt: Date,
}

const imageTempSchema: Schema = new Schema<IImageTemp>({
    dataURL: { type: String, required: true },
    createAt: { type: Date, required: true, default: Date.now, expires: 86400 }
});

export { imageTempModelSchema };
