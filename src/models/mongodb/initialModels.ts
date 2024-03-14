import type { Connection, Model } from "mongoose";
import type { IMemes } from "./memes";
import type { IImageTemp } from "./imageTemp";

import { memesModelSchema } from "./memes";
import { imageTempModelSchema } from "./imageTemp";

export interface IMongooseModel {
    memesModel: Model<IMemes>,
    imageTempModel: Model<IImageTemp>,
}

export const initialModels = (mongoose: Connection): IMongooseModel => {
    const memesModel: Model<IMemes> = memesModelSchema(mongoose);
    const imageTempModel: Model<IImageTemp> = imageTempModelSchema(mongoose);

    return { memesModel, imageTempModel };
};
