// const 

const ownerVerify = (req,res,next) => {
    const {uid} = req.auth;
    const {id} = req.params;
    if(uid != id){
        return res.status(403).json({
            message: "this account does not belongs to you !"
        })
    }else{
        next();
    }
}

module.exports = ownerVerify;