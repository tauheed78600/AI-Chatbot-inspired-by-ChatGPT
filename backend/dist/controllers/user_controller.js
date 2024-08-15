import user from "../models/user.js";
import bcrypt from 'bcrypt';
import { createToken } from "../utils/tokenManager.js";
import { COOKIE_NAME } from "../utils/constants.js";
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await user.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
export const userSignup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const isExisting = await user.findOne({ email });
        if (isExisting) {
            return res.status(400).json({ message: "User with this email ID already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user1 = new user({ name, email, password: hashedPassword });
        await user1.save();
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true
        });
        const token = createToken(user1._id.toString(), user1.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        });
        return res.status(201).json({ message: "OK", name: user1.name, email: user1.email });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const checkUser = await user.findOne({ email });
        if (!checkUser) {
            return res.status(401).send("User not registered");
        }
        const checkPassword = await bcrypt.compare(password, checkUser.password);
        if (!checkPassword) {
            return res.status(400).send("Password is incorrect");
        }
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true
        });
        const token = createToken(checkUser._id.toString(), checkUser.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        });
        console.log("inside");
        return res.status(200).json({ message: "OK", name: checkUser.name, email: checkUser.email });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
export const verifyUser = async (req, res, next) => {
    try {
        const user2 = await user.findById(res.locals.jwtData.id);
        if (!user2) {
            return res.status(401).send("User not registered or Token Malfunctioned");
        }
        console.log(user2._id.toString(), res.locals.jwtData.id);
        if (user2._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didnt match");
        }
        console.log("inside");
        return res.status(200).json({ message: "OK", name: user2.name, email: user2.email });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
export const userLogout = async (req, res, next) => {
    try {
        const user2 = await user.findById(res.locals.jwtData.id);
        if (!user2) {
            return res.status(401).send("User not registered or Token Malfunctioned");
        }
        console.log(user2._id.toString(), res.locals.jwtData.id);
        if (user2._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didnt match");
        }
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true
        });
        console.log("inside");
        return res.status(200).json({ message: "OK", name: user2.name, email: user2.email });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=user_controller.js.map