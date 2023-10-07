const jwt = require('jsonwebtoken');

const jwtVerify = (req,res,next) => {
    const header = req.header('Authorization');
    if(header){
        const token = header.split(" ")[1];
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        // console.log(decoded)
        if(!decoded){
            return res.status(401).json({
                message: "Invalid token!"
            })
        }
        req.auth = decoded
        next();

    }else{
        return res.status(401).json({
            message: "You cannot access this resources!"
        })
    }
}

module.exports = jwtVerify