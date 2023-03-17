import express from "express";
import cors from "cors";
import { logger } from "utils/logger";
import { morganConfig } from "middlewares/morgan";

export const startServer = () => {
	const app = express();
	const port = process.env["PORT"];

	app.use(cors());
	app.use(express.json());
	app.use(morganConfig);

	app.get("/", (req, res) => {
		return res.status(200).json({
			success: true,
			message: "Welcome to the proto API",
		});
	});

	app.listen(port, () => logger.info(`App running at port: ${port}`));
};
