import type { Router } from "express";

import express from "express";
import { memesController } from "../controllers/memesController";

class MemesRoute {
	router: Router;
	constructor() {
		this.router = express.Router();
		this.initializeRoute();
	}

	initializeRoute(): void {
        this.router.get("/", memesController);
	}
}

export const memesRoute: MemesRoute = new MemesRoute();
