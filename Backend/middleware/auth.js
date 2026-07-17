//Req arrives from frntend
//takes the header
//extract the token
//verify the token
// store decodedinfo to user

import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {

    // suppose fe sends this -> Authorization: Bearer abc123xyz456
    const authHeader = req.headers.authorization;   //Bearer abc123xyz456

    if(!authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            message : "Invalid token format",
        });
    }

    const token = authHeader.split(" ")[1];
    //authHeader.split(" ") -> ["Bearer", "abc123xyz456"]
    //authHeader.split(" ")[1] -> "abc123xyz456"

    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);  ///gives the user id and email
        req.user = decodedToken;   // use to tell the system who the user is
        next();   //used to pass the control to actual route from middleware
    }
    catch(err) {
        console.log("JWT_ERROR : ", err.message);
        return res.status(401).json({
            message : "Invalid Token",
        });
    }
};

export default authenticateToken;