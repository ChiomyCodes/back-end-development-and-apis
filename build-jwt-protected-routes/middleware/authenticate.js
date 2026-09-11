import { verifyToken } from "../utils/jwt.js";
import {isBlacklisted} from "../utils/token-blacklist.js"

export default function authenticate(req, res, next){
    const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "No token provided",
    });
  }
  

  const token = authHeader.split(" ")[1];
    if (isBlacklisted(token)) {
    return res.status(401).json({
      message: "Token has been invalidated. Log in again.",
    });
  }

  const user = verifyToken(token)
   if (!user) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
   res.status(200).json({data:user})

  req.user = user;
 
  next();

}