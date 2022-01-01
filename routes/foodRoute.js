const express = require('express');
const router = new express.Router();
const auth = require("../auth/auth");
const Product = require("../models/productModel")

//for inserting products
router.post("/product/insert", auth.verifyCustomer, function(req, res){
    const fname= req.body.fname; 
    const fdesc = req.body.fdesc;
    const fprice= req.body.fprice;
    const userID= req.customerInfo._id;
  
})

//to update product

router.put("/product/update", auth.verifyCustomer, function(req, res){
    const fid = req.body.pid;
    const fname=req.body.fname;
    const fdesc= req.body.pdesc;
    Product.updateOne({_id : fid}, {fname: fname, fdesc:fdesc})
    .then()
    .catch()
})

router.delete('/product/delete', auth.verifyCustomer, function(req, res){
    const fid = req.body.fid;
    Product.findByAndDelete(pid)
    .then()
    .catch()
})

//to show the product of the logged in user
router.get("/product/view", auth.verifyCustomer, function(req, res){
    userID = req.customerInfo._id;
    Product.find({_id: userID})
    .then(function(result){
        res.json(result)
    })
    .catch(function(e){
        res.json({msg: "something went wrong!"})
    })
})

module.exports= router;
