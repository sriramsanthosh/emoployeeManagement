const { verifyToken } = require("../config/jwt");
const Employee = require("../models/Employee");
var validator = require('validator');

module.exports.create = async (req, res) => {
    try {
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
        if(!courses.length){
            return res.status(201).json({
                message:"Select atleast one Course.."
            });
        }
        if(!req.body.gender){
            return res.status(201).json({
                message:"Selet the gender.."
            });
        }
        if(!req.body.image){
            return res.status(201).json({
                message:"Selet an image.."
            });
        }
        if(req.body.name.length < 5){
            return res.status(201).json({
                message:"Name should be min. 5 characters"
            });
        }
        
        let employeeData = {
            f_Name: req.body.name,
            f_Email: req.body.email,
            f_Mobile: req.body.phone,
            f_Designation: req.body.designation,
            f_gender: req.body.gender,
            f_Course: courses,
            f_Image: req.body.image
        }
        let NewEmployee = await Employee.create(employeeData);
        // // console.log("NewEmployee", NewEmployee);
        return res.status(200).json({
            message: "Employee Created.."
        });
    }
    catch (err) {
        // console.log("Internal Error");
        return res.status(500).json({
            message:'Internal Server Error'
        });
    }
}

module.exports.get=async(req, res)=>{
    try{
        const uniqueId = req.query.id;
        // // console.log(uniqueId);
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
        // console.log("Internal Server Error", err);
        return res.status(500).json({
            message:"Internal Server Error"
        });
    }
}

module.exports.update = async(req, res)=>{
    try{

        // console.log(req.query.id);
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
            f_Course: courses,
            f_Image: req.body.image
        }
        // console.log(employeeData);
    let currEmployee = await Employee.findOneAndUpdate({_id: req.query.id}, employeeData);
    if(!currEmployee){
        return res.status(203).json({
            message:"Something Went Wrong"
        });
    }
    return res.status(200).json({
        message:"Update Successful.."
    })
}
catch(err){
    // console.log(err);
    return res.status(500).json({
        message: "Internal Server Error"
    })
}

}

module.exports.delete = async(req, res)=>{
    try{
        const uniqueId = await req.query.empId;
        const currEmployee = await Employee.find({_id: uniqueId});
        if(!currEmployee[0]){
            // console.log("Employee Not Found!");
            return res.status(203).json({
                message:"Employee Not Found"
            });
        }
        let deletedEmployee = await Employee.findOneAndDelete({_id:uniqueId});
        // console.log(deletedEmployee);
        return res.status(200).json({
            message:'Deleted Employee..'
        });
    }
    catch(err){
        // console.log("Internal Server Error", err);
        return res.status(500).json({
            message:"Internal Server Error"
        });
    }
}

module.exports.list=async(req, res)=>{
    try{
        // let token = req.body.headers.Authorization;
        // if (!token || !token.startsWith('Bearer ')) {
        //     return res.status(203).json({ message: 'Unauthorized' });
        // }
        // let tokenStatus = await verifyToken(token);
        // // console.log("Hi");
        // if (tokenStatus === null) {
        //     // console.log(tokenStatus);
        //     return res.status(201).json({
        //         message: "Session Expired"
        //     });
        // }
        
        let details = await Employee.find({}).sort({ f_Createdate: -1 });
        
        return res.status(200).json({
            employeeDetails: details
        });
        
    }
    catch(err){
        // console.log("Internal Error");
        return res.status(500).json({
            message:'Internal Server Error'
        });
    }
}


