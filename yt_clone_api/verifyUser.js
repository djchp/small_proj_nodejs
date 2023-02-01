import Jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) return next(createError(401)).json("not auth")

    Jwt.verify(token, process.env.JWT, (err, user)=> {
        if(err) return next(createError(403)).json("token not valid")
        req.user = user;
        next()
    })
}