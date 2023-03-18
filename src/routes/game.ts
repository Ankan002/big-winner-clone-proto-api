import { spinWheel } from "controllers/game";
import { Router } from "express";

export const gameRouter = Router();

gameRouter.route("/spin-wheel").post(spinWheel);
