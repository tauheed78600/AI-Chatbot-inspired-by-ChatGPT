import { Router } from 'express'
import userRoute from './user_routes.js'
import chatRoute from './chat_route.js'

const AppRouter = Router()

AppRouter.use("/user", userRoute)
AppRouter.use("/chats", chatRoute)

export default AppRouter