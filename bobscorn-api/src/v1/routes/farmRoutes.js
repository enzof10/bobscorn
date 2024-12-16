import express from "express";
export const farmRoute = express.Router();
import FarmController from "../../controllers/farmController.js";

/**
 * @swagger
 * tags:
 *   name: Farm
 *   description: Endpoints for managing corn purchases
 */

/**
 * @swagger
 * /api/v1/farm/buy-corn:
 *   post:
 *     summary: Buy corn for a customer
 *     tags: [Farm]
 *     parameters:
 *       - in: query
 *         name: clientid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the client buying corn
 *     responses:
 *       200:
 *         description: Corn bought successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
farmRoute.post("/farm/corn/buy", FarmController.buyCorn);

/**
 * @swagger
 * /api/v1/farm/corn/purchases/{clientid}:
 *   get:
 *     summary: Get corn purchase history for a client
 *     tags: [Farm]
 *     parameters:
 *       - in: path
 *         name: clientid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the client
 *     responses:
 *       200:
 *         description: A list of corn purchases
 *       404:
 *         description: Client not found
 *       500:
 *         description: Internal server error
 */
farmRoute.get("/farm/corn/purchases/:clientid", FarmController.getCornPurchases)


/**
 * @swagger
 * /api/v1/farm/sale-policies:
 *   get:
 *     summary: Get sale policies
 *     tags: [Farm]
 *     responses:
 *       200:
 *         description: Returns the sale policies (rate limit and interval)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 limitRateQuantity:
 *                   type: integer
 *                   description: Number of allowed requests.
 *                 limitRateInterval:
 *                   type: string
 *                   description: Time interval for rate limit
 *                 limitRateIntervalMeasurement:
 *                   type: string
 *                   description: Type of unit of measurement for rate limit.
 *       500:
 *         description: Internal server error
 */
farmRoute.get("/farm/sale-policies", FarmController.getSalePolicies);

;
