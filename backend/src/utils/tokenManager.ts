import Jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from 'express'
import { COOKIE_NAME } from "./constants.js"
import { resolve } from "path"

export const createToken = (id: string, email: string, expiresIn: string) =>{
    const payload = {id, email}
    const token = Jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: expiresIn
    })
    return token
}

export const verifyToken = async(req: Request, res: Response, next: NextFunction) => {
    const token = req.signedCookies[`${COOKIE_NAME}`]
    if (!token || token.trim() === ""){
        return res.status(401).json({message: "Token not recieved"})
    }
    return new Promise<void>((resolve, reject) =>{
        return Jwt.verify(token, process.env.JWT_SECRET, (err, success) =>{
            if (err){
                reject(err.message)
                return res.status(401).json({message: "Token Expired"})
            }
            else{
                console.log("Token verification successful")
                resolve()
                res.locals.jwtData = success
                return next()
            }
        })
    })
}