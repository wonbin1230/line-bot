import type { Middleware } from "@line/bot-sdk/dist/middleware";
import type { MessagingApiClient as MessageApiClientType } from "@line/bot-sdk/dist/messaging-api/api";

import { lineBotConfig } from "../env";
import { middleware, messagingApi } from "@line/bot-sdk";

export const lineBotClient: MessageApiClientType = new messagingApi.MessagingApiClient(lineBotConfig);
export const lineBotMiddleware: Middleware = middleware(lineBotConfig);
