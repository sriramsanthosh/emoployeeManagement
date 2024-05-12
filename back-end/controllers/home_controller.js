const { verifyToken } = require("../config/jwt");

module.exports.home = (req, res)=>{
    try{
        return res.status(200).json({
            message:"This is the home page"
        });
    }
    catch(err){
        console.error("Error in rendering home", err);
    }   
}

module.exports.verifyToken = async(req, res)=>{
    try{
        let token = req.body.headers.Authorization;
        console.log(token);
        if (!token || !token.startsWith('Bearer ')) {
            return res.status(203).json({ message: 'Unauthorized' });
        }
        let tokenStatus = await verifyToken(token);
        if(tokenStatus === null){
            console.log(tokenStatus);
            return res.status(201).json({
                message: "Session Expired"
            });
        }
        return res.status(200).json({
            message:"Redirecting to dashboard.."
        });
    }
    catch(err){
        console.log("Error", err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}