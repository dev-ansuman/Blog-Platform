import { DatabaseSync } from 'node:sqlite';
// import {} from '../db/'
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const database = new DatabaseSync(`${__dirname}/blog.db`);

export default database;
