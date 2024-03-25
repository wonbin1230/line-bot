import type { Router } from "express";

import express from "express";
import { lineBotMiddleware } from "../config/lineBot";
import { lineBotController } from "../controllers/lineBotController";

class LinebotRoute {
	router: Router;
	constructor() {
		this.router = express.Router();
		this.initializeRoute();
	}

	initializeRoute(): void {
        this.router.post("/", lineBotMiddleware, lineBotController.main);
	}
}

export const linebotRoute: LinebotRoute = new LinebotRoute();
