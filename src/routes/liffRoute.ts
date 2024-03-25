import type { Router } from "express";

import express from "express";
import { liffController } from "../controllers/liffController";

class LiffRoute {
	router: Router;
	constructor() {
		this.router = express.Router();
		this.initializeRoute();
	}

	initializeRoute(): void {
        this.router.get("/", liffController.main.bind(liffController));
        this.router.post("/", liffController.saveDataURL);
        this.router.get("/shareImage", liffController.shareImageById);
	}
}

export const liffRoute: LiffRoute = new LiffRoute();
