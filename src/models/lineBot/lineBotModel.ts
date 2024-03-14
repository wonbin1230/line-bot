import type { EventBase, Message } from "@line/bot-sdk/lib/types";

interface IEventMessage {
    id: string,
    quoteToken: string,
    text: string,
    type: string,
}

export interface IWebhookEvent extends EventBase {
    message: IEventMessage,
    replyToken: string,
    type: string,
}

export interface IReplyOptions {
    replyToken: string,
    messages: Array<Message>,
}

export interface IFlexMessageArgs {
    name: string,
    originImgUrl: string,
    liffUrl: string,
}
