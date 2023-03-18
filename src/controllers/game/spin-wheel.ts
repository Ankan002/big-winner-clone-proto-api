import { Request, Response } from "express";
import { z } from "zod";
import { randomInt } from "crypto";
import { logger } from "utils/logger";

const RequestBodySchema = z.object({
	predictedNumber: z
		.number()
		.min(1, { message: "The minimum number to be selected is 1" })
		.max(10, { message: "The maximum number to be selected is 10" }),
	betAmount: z
		.number()
		.min(1, { message: "Please place at least ₹1 as bet" })
		.max(10000000, { message: "Bet cannot be more than ₹10000000" }),
});

export const spinWheel = (req: Request, res: Response) => {
	const requestBodyValidationResult = RequestBodySchema.safeParse(req.body);

	if (!requestBodyValidationResult.success) {
		return res.status(400).json({
			success: false,
			error: requestBodyValidationResult.error.errors[0]?.message,
		});
	}

	const requestBody = requestBodyValidationResult.data;

	const randomNumber = randomInt(10) + 1;

	// Can remove these log lines
	logger.debug(`Predicted: ${requestBody.predictedNumber}`);
	logger.debug(`Generated: ${randomNumber}`);

	if (randomNumber !== requestBody.predictedNumber) {
		return res.status(200).json({
			success: true,
			data: {
				predictedNumber: requestBody.predictedNumber,
				resultNumber: randomNumber,
				result: "lost",
				amountWon: 0,
				amountLost: requestBody.betAmount,
			},
		});
	}

	return res.status(200).json({
		success: true,
		data: {
			predictedNumber: requestBody.predictedNumber,
			resultNumber: randomNumber,
			result: "won",
			amountWon: requestBody.betAmount * 2,
			amountLost: 0,
		},
	});
};
