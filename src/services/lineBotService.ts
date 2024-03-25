import type { IWebhookEvent, IReplyOptions, IFlexMessageArgs } from "../models/lineBot/lineBotModel";
import type { IMemes } from "../models/mongodb/memes";

import { lineBotClient } from "../config/lineBot";
import { mongoModel } from "../config/mongo";
import { base64Encoder } from "./utils";
import { genFlexMessageModel } from "../models/lineBot/flexMessageModel";

class MessageService {
    async main(event: IWebhookEvent): Promise<void> {
        if (typeof event.message.text === "string" && event.message.text.startsWith("/list")) {
            return this.#getList(event.replyToken, event.message.text);
        }

        return;
    }

    async #getList(replyToken: string, inputMessage: string): Promise<void> {
        const replyOptions: IReplyOptions = {
            replyToken: replyToken,
            messages: []
        };
        const flexItems: Array<IFlexMessageArgs> = [];
        const conditions: string = inputMessage.split(" ")[1] || "" ;
        const list: Array<IMemes> = await mongoModel.memesModel.find({name: { $regex: `.*${conditions}.*`} }).limit(12).lean();
        for (let i: number = 0; i < list.length; i++) {
            const ele: IMemes = list[i];
            flexItems.push({
                name: ele.name,
                originImgUrl: `https://yu-website.duckdns.org/linebot/memes?name=${base64Encoder(ele.name)}`,
                liffUrl: `https://liff.line.me/2004035309-EdReblAM?name=${base64Encoder(ele.name)}`,
            });
        }
        replyOptions.messages = [
            { type: "flex", altText: "memes", contents: genFlexMessageModel(flexItems) }
        ];
        await lineBotClient.replyMessage(replyOptions);
    }
}

export const messageService: MessageService = new MessageService();
