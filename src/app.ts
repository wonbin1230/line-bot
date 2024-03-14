import type { Express } from "express";
import type { Server as httpServer } from "http";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { join } from "path";
import { createServer } from "http";
import { linebotRoute } from "./routes/lineBotRoute";
import { memesRoute } from "./routes/memesRoute";
import { liffRoute } from "./routes/liffRoute";

const app: Express = express();
const server: httpServer = createServer(app);
const port: number = Number(process.env.PORT) || 5000;

app.use("/webhook", linebotRoute.router);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use("myPublic", express.static(join(__dirname, "public")));
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/memes", memesRoute.router);
app.use("/liff", liffRoute.router);

server.listen(port, () => {
	console.log(`Server is running at port ${port}`);
});
