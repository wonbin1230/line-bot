import type { Request, Response } from "express";
import type { IImageTemp } from "../models/mongodb/imageTemp";
import type { IShareImageRequest } from "../models/lineBot/liffModel";

import { base64Decoder } from "../services/utils";
import { liffService } from "../services/liffService";
import { getFormatDate } from "../services/utils";
import { Readable } from "stream";

class LiffController {
    async main (req: Request, res: Response): Promise<void> {
		try {
			const imageName: string = this.#getParameters(req, "name");
			const title: string = imageName ? base64Decoder(imageName) : "";
			res.render("memes", {
				name: imageName || "",
				title: title || "",
			});
		}
        catch (error) {
			console.log(`LiffController.main error: ${error.message || error}`);
			res.status(500).send(error.message || error);
		}
	}

	async saveDataURL(req: Request, res: Response): Promise<void> {
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

    async shareImageById(req: Request, res: Response): Promise<void> {
        try {
            const currentTime: string = getFormatDate();
            const { imageId, userName, userId }: IShareImageRequest = {
                imageId: req.query.imageId as string,
                userName: req.query.userName as string,
                userId: req.query.userId as string
            };
            console.log(`User ${userId}-${userName} request image id ${imageId} at ${currentTime}`);
			const data: IImageTemp = await liffService.getDataURLById(imageId as string);
			if (!data) {
				console.log(`${imageId as string} is missing`);
				return;
			}
			const buffer: Buffer = Buffer.from(data.dataURL.split(",")[1], "base64");
			const stream: Readable = new Readable({
				read(): void {
					this.push(buffer);
					this.push(null);
				},
			});
			res.set({ "Content-Type": "image/jpeg" });
			stream.pipe(res);
        }
        catch (error) {
            console.log(`LiffController.shareImageById error: ${error.message || error}`);
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
