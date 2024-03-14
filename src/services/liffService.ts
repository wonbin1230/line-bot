import type { IImageTemp } from "../models/mongodb/imageTemp";

import { mongoModel } from "../config/mongo";

class LiffService {
    async insertDataURL(dataURL: string): Promise<IImageTemp> {
        return await mongoModel.imageTempModel.create({ dataURL });
    }

    async getDataURLById(id: string): Promise<IImageTemp> {
        return await mongoModel.imageTempModel.findById(id).lean();
    }
}

export const liffService: LiffService = new LiffService();
