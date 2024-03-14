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
        this.router.get("/", liffController.main);
        this.router.post("/", liffController.saveDataURL);
	}
}

export const liffRoute: LiffRoute = new LiffRoute();
