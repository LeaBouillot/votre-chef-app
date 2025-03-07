// api/server.js
import { createServer } from 'json-server';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const server = createServer();
const router = server.router(path.join(__dirname, '../db.json'));
const middlewares = server.defaults();

server.use(middlewares);
server.use(router);

export default server;