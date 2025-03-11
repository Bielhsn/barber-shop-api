import express from 'express'
import cors from 'cors'
import { conectarBanco } from './config/db.js'
import agendamentoRoutes from './routes/agendamentoRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/agendamentos', agendamentoRoutes)

const PORT = 8080

conectarBanco().then(() => {
    app.listen(PORT, () => {
        console.log(`API rodando na porta ${PORT}`)
    })
})
