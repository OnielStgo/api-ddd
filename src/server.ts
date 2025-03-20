import app from "./presentation/app"
import 'dotenv/config'

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
  console.log(`Server rodando na porta: ${PORT}`)
})

export default server
