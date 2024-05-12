const { verifyToken } = require("../config/jwt");
const Employee = require("../models/Employee");

module.exports.create = async (req, res) => {
    try {
        let token = req.body.headers.Authorization;
        if (!token || !token.startsWith('Bearer ')) {
            return res.status(203).json({ message: 'Unauthorized' });
        }
        let tokenStatus = await verifyToken(token);
        if (tokenStatus === null) {
            console.log(tokenStatus);
            return res.status(201).json({
                message: "Session Expired"
            });
        }
        let courses = [];
        if (req.body.courses.MCA) {
            courses.push("MCA");
        }
        if (req.body.courses.BCA) {
            courses.push("BCA");
        }
        if (req.body.courses.BSC) {
            courses.push("BSC");
        }
        let employeeData = {
            f_Name: req.body.name,
            f_Email: req.body.email,
            f_Mobile: req.body.phone,
            f_Designation: req.body.designation,
            f_gender: req.body.gender,
            f_course: courses,
            f_Image: req.body.image
        }
        let NewEmployee = await Employee.create(employeeData);
        console.log("NewEmployee", NewEmployee);
        return res.status(200).json({
            message: "Employee Created.."
        });
    }
    catch (err) {
        console.log("Internal Error");
        return res.status(500).json({
            message:'Internal Server Error'
        });
    }
}

module.exports.update=async(req, res)=>{
    try{
        const uniqueId = req.query.id;
        const currEmployee = await Employee.find({_id: uniqueId});
        if(currEmployee.length){
            return res.status(200).json({
                currEmployee: currEmployee[0]
            });
        }
        else{
            return res.status(201).json({
                message: "Employee doesn't Exist.."
            });
        }
    }
    catch(err){
        console.log("Internal Server Error", err);
    }
}
module.exports.list=async(req, res)=>{
    try{
        // let token = req.body.headers.Authorization;
        // if (!token || !token.startsWith('Bearer ')) {
        //     return res.status(203).json({ message: 'Unauthorized' });
        // }
        // let tokenStatus = await verifyToken(token);
        // console.log("Hi");
        // if (tokenStatus === null) {
        //     console.log(tokenStatus);
        //     return res.status(201).json({
        //         message: "Session Expired"
        //     });
        // }
        
        let details = await Employee.find({});
        console.log(details);
        return res.status(200).json({
            employeeDetails: details
        });
        
    }
    catch(err){
        console.log("Internal Error");
        return res.status(500).json({
            message:'Internal Server Error'
        });
    }
}


