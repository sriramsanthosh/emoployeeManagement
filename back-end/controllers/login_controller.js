const { hashPassword, verifyPassword } = require("../config/bcrypt");
const { createToken } = require("../config/jwt");
const Login = require("../models/Login");
require("../config/bcrypt");


module.exports.register = async(req, res)=>{
    const accountInDB = await Login.find({ f_userName: req.body.userName });
    if (!accountInDB.length) {
        const password = req.body.password;
        await hashPassword(password).then(async (hashedPassword) => {
            // console.log("Hashed Password:", hashedPassword);
            let user = await Login.create({
                f_userName: req.body.userName,
                f_Pwd: hashedPassword
            });
            // console.log(user);
            return res.status(200).json({
                message:"Account created.."
            });
        });
    }
}


module.exports.login = async (req, res) => {
    try {
        const accountInDB = await Login.find({ f_userName: req.body.userName });
        // console.log(accountInDB[0]);
        if (!accountInDB.length) {
            return res.status(201).json({
                message:"Account doesn't exists.."
            });
        }  
        if(await verifyPassword(req.body.password, accountInDB[0].f_Pwd)){
            let token = await createToken({userName:accountInDB[0].f_userName, password:accountInDB[0].f_Pwd});
            return res.status(200).json({
                message:"Login Success..",
                token: token
            });
        }  
        return res.status(203).json({
            message :"Incorrect credentials"
        });
    }
    catch (err) {
        // console.log(err);
        return res.status(203).json({
            message: "Internal Sever Error",
            error: err
        });
    }
}