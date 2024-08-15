import { Router } from "express";
import { getAllUsers, userLogin, userLogout, userSignup, verifyUser } from "../controllers/user_controller.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/tokenManager.js";
const userRoute = Router();
userRoute.get("/users", getAllUsers);
userRoute.post("/signup", validate(signupValidator), userSignup);
userRoute.post("/login", validate(loginValidator), userLogin);
userRoute.get("/auth-status", verifyToken, verifyUser);
userRoute.delete("/logout", verifyToken, userLogout);
export default userRoute;
//# sourceMappingURL=user_routes.js.map