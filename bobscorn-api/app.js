import express from 'express'
import { globalErrorHandler } from './src/middlewares/globalErrorHandler.js';
import { healthRoute } from './src/v1/routes/home.js';
import { farmRoute } from './src/v1/routes/farmRoutes.js';
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./swaggerConfig.js";

const app = express();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.use(express.json());
app.use("/api/v1", healthRoute);
app.use("/api/v1", farmRoute);
const specs = swaggerJsdoc(swaggerOptions);
app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(globalErrorHandler);

export default app