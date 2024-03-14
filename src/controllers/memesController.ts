import type { Request, Response } from "express";

import { base64Decoder } from "../services/utils";
import { basePath } from "../env";

export const memesController = async (req: Request, res: Response): Promise<void> => {
    try {
        let name: string = req.query.name as string;
        if (name.includes(" ")) {
            name = name.replace(" ", "-");
        }
        const currentPath: string = `${basePath}/${base64Decoder(name)}.png`;
        res.sendFile(currentPath);
    }
    catch (error) {
        console.log(`memesController error: ${error.message}`);
    }
};
