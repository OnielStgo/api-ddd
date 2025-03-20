import express from "express"
import { Routes } from "./router"

const app = express()

app.use(express.json())
app.use(Routes.routes)

export default app