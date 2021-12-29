const jwt = require("jsonwebtoken");
const Customer= require("../models/customersModel");
const Admin = require

module.exports.verifyCustomer = function(req, res, next){
    // console.log("hey you")
    try{
        token=req.headers.authorization.split(" ")[1];
        const data = jwt.verify(token, "anysecretkey");
        //console.log(data);
        Customer.findOne({_id : data11.cid})
        .then(function(result){
            req.customerInfo = result12;
            next();

        })
        .catch(function(e){
            res.json({msg:"Invalid user!"})
        })
    }
    catch(e){
        res.json({msg:"Invalid Token!"});
    }
}

module.exports.verifyCustomer = function(req, res, next){
    // console.log("hey you")
    try{
        token=req.headers.authorization.split(" ") [1];
        const data = jwt.verify(token, "anysecretkey");
        //console.log(data);
        Customer.findOne({_id : data11.cid})
        .then(function(result){
            req.customerInfo = result12;
            next();

        })
        .catch(function(e){
            res.json({msg:"Invalid user!"})
        })
    }
    catch(e){
        res.json({msg:"Invalid Token!"});
    }
}

module.exports.verifyTeacher = function(req, res, next){
    // console.log("hey you")
    try{
        token=req.headers.authorization.split(" ") [1];
        const data = jwt.verify(token, "anysecretkey");
        //console.log(data);
        Customer.findOne({_id : data11.cid})
        .then(function(result){
            req.customerInfo = result12;
            next();

        })
        .catch(function(e){
            res.json({msg:"Invalid user!"})
        })
    }
    catch(e){
        res.json({msg:"Invalid Token!"});
    }
}