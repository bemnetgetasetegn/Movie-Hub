import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./Routes/router.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/auth', authRoutes)

app.get('/', (req, res) => {
    res.json({message: 'Server is running'})
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})