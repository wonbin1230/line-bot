import type { Connection, Model } from "mongoose";

import { Schema } from "mongoose";

const memesModelSchema = (mongoose: Connection): Model<IMemes> => {
    return mongoose.model<IMemes>("Memes", memesSchema);
};

export interface IMemes {
    name: string,
    uri: string,
}

const memesSchema: Schema = new Schema<IMemes>({
    name: { type: String, required: true },
    uri: { type: String, required: true }
});

export { memesModelSchema };
