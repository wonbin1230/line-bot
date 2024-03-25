import type { Request, Response } from "express";
import type { WebhookRequestBody } from "@line/bot-sdk";
import type { IWebhookEvent } from "../models/lineBot/lineBotModel";

import { messageService } from "../services/lineBotService";

class LineBotController {
    async main(req: Request, res: Response): Promise<void> {
        try {
            const lineRespones: WebhookRequestBody = req.body as WebhookRequestBody;
            const event: IWebhookEvent = lineRespones.events[0] as IWebhookEvent;

            if (event.type === "message") {
                await messageService.main(event);
            }
            res.json();
        }
        catch (error) {
            console.log(`lineBotController error: ${error.message}`);
        }
    }
}

export const lineBotController: LineBotController = new LineBotController();
