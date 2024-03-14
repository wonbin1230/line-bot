import type { Request, Response } from "express";
import type { IImageTemp } from "../models/mongodb/imageTemp";

import { base64Decoder } from "../services/utils";
import { liffService } from "../services/liffService";
import { delay } from "../services/utils";
import { writeFileSync, rmSync } from "fs";
import { join } from "path";

class LiffController {
    main = async (req: Request, res: Response): Promise<void> => {
        try {
            if (req.query.id) {
                const data: IImageTemp = await liffService.getDataURLById(req.query.id as string);
                const buffer: Buffer = Buffer.from(data.dataURL.split(",")[1], "base64");
                const tempFilePath: string = join(__dirname, "image.png");
                writeFileSync(tempFilePath, buffer);
                res.sendFile(tempFilePath);
                // await delay(3000);
                // rmSync(tempFilePath);
            }
            else {
                const imageName: string = this.#getParameters(req, "name");
                const title: string = imageName ? base64Decoder(imageName) : "";
                res.render("memes", {
                    name: imageName || "",
                    title: title || ""
                });
            }
        }
        catch (error) {
            console.log(`LiffController.main error: ${error.message || error}`);
            res.status(500).send(error.message || error);
        }
    };

    async saveDataURL(req: Request, res: Response): Promise<void>{
        try {
            const dataURL: string = req.body.data as string;
            const result: IImageTemp = await liffService.insertDataURL(dataURL);
            res.json(result);
        }
        catch (error) {
            console.log(`LiffController.saveDataURL error: ${error.message || error}`);
            res.status(500).send(error.message || error);
        }
    }

    #getParameters(req: Request, paramsName: string): string {
        const params: URLSearchParams = new URLSearchParams(req.query["liff.state"] as string);
        const imageName: string = params.get(paramsName);
        return imageName;
    }
}

export const liffController: LiffController = new LiffController();
