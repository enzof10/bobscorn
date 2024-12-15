import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { version } = require('./package.json');


const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Bob's Farm API",
        version: version,
        description: "API for managing corn purchases at Bob's Farm",
    },
    servers: [
        {
            url: "http://localhost:" + process.env.BOBSCORN_API_PORT,
            description: "Local server",
        },
    ],
};

export const swaggerOptions = {
    swaggerDefinition,
    apis: ["./src/v1/routes/**/*.js"],
};
