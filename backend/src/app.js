import 'dotenv/config'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import cors from 'cors'
import { SERVER_PORT, SERVER_HOST } from './utils/constants.js'
import routes from './routes/index.js'
import { database } from '../db/db.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

const server_host = SERVER_HOST || "localhost"
const server_port = SERVER_PORT || 4000


app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads')))
app.use(express.json())
app.use('/', routes)

app.listen(server_port,() => {
    console.log(`Server is listening on http://${server_host}:${server_port}`)
})