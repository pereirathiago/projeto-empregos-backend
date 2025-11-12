import '@shared/container'
import cors from 'cors'
import express from 'express'
import { errorHandler } from './middleware/errorHandler'
import { logRequest } from './middleware/logRequest'
import { logResponse } from './middleware/logResponse'
import routes from './routes'

const app = express()

const allowedOrigins = '*'

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}

app.use(cors(options))

app.use(express.json())

app.use(logRequest)
app.use(logResponse)

app.use(routes)

app.use(errorHandler)

export default app
