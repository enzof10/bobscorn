import app from './app.js'
import PrismaManager from './src/utils/prismaManager.js';
const PORT = process.env.BOBSCORN_API_PORT;

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { name } = require('./package.json');


const StartServer = async () => {
    PrismaManager.getInstance();
    app.listen(PORT, async () => {
        console.log(`${name} listening at http://localhdost:${PORT}`)
        console.log(`${name} api doc at http://localhdost:${PORT}/api/v1/api-docs`)
    }).on('error', (err) => {
        console.log(err);
        process.exit();
    })

}

StartServer()
