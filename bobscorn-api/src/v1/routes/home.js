import express from "express";
import PrismaManager from "../../utils/prismaManager.js";
import { resultStrings } from "../../enums/resultStrings.js";
export const healthRoute = express.Router();

/**
 * @swagger
 * /api/v1/:
 *   get:
 *     summary: Health check for the server and database
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server and database are healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: SUCCESS
 *                 dbConnection:
 *                   type: string
 *                   example: SUCCESS
 *       500:
 *         description: Server or database is down
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: ERROR
 *                 data:
 *                   type: string
 *                   example: "Error stack trace here"
 */
healthRoute.get("/", async (req, res) => {
    const prisma = PrismaManager.getPrismaInstance();
    try {
        const dbConnection = await prisma.$queryRaw`SELECT 1` ? true : false;
        res.status(200).json({
            result: resultStrings.SUCCESS,
            dbConnection: resultStrings.SUCCESS
        });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({
            result: resultStrings.ERROR,
            data: error.stack
        });
    }
});
