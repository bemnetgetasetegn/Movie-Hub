import express from 'express'
import { register, login } from '../Controllers/authController.js'
import { createVisitor } from '../Controllers/visitorController.js'

const apiRoutes = express.Router()

apiRoutes.post('/register', register)
apiRoutes.post('/login', login)
apiRoutes.post('/visitors', createVisitor)

export default apiRoutes