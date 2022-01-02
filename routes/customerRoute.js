const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");
const upload = require("../file/upload");

const router = new express.Router();

const customer = require('../models/customersModel');

//code to register
router.post('/customer/register',
    //upload.single('pro_name'),
    function (req, res) {
        const username = req.body.username;
        customer.findOne({ username: username }).then(function (data) {
            //console.log(data);
            if (data != null) {
                res.json({ msg: "Username already exists", success: false })
                return;

            }
            const password = req.body.password;
            const address = req.body.address;
            const email = req.body.email;

            bcryptjs.hash(password, 10, function (e, hashed_pw) {
                const customerData = new customer({
                    username: username,
                    password: hashed_pw,
                    address: address,
                    email: email
                })
                customerData.save()
                    .then(function () {
                        res.json({ msg: "Registered Successful" })
                    })
                    .catch(function (e) {
                        res.json(e)
                    })

            })


        })

    })

//login route
router.post("/customer/login", function (req, res) {
    const username = req.body.username;
    customer.findOne({ username: username })
        .then(function (customerData) {
            //console.log(customerData);
            if (customerData === null) {
                return res.json({ message: "Invalid" })
            }

            //now compare password
            const password = req.body.password;

            bcryptjs.compare(password, customerData.password, function (e, result) {
                //true = password correct
                //false = password correct
                if (result == false || result == undefined) {
                    return res.json({ message: "Invalid" })
                }
                /// now we need to generate ticket //jsonwebtoken  
                const token = jwt.sign({ cid: customerData._id }, "anysecretkey");
                console.log('tokn: ', token)
                res.json({ token: token })
            })
        })
})
//customer profile update
router.put("customer/profile/update", auth.verifyCustomer, function (req, res) {
    const id = req.customerInfo._id;
    const address = req.body.address;
    customer.updateOne({ _id: id }, { address: "address", email: email })
        .then(function () {
            res.json({ msg: "update success!" })
        })
        .catch(function () {
            res.json({ msg: "something went wrong!" })
        })
})
// exports.postForgetPassword = (req, res) => {
//     const email = req.body.email;
//     console.log("1");
//     User.findOne({ email: email })
//         .then((user) => {
//             console.log("2");
//             if (!user) {
//                 console.log("3");
//                 return res.send({ success: false, message: "email not found" });
//             }
//             const { otpCode, otpDate } = generateOTPCode();
//             user.updateOne({ otpCode: otpCode, otpDate: otpDate }, (err, success) => {
//                 if (err) {
//                     console.log("4");
//                     return res.status(400).json({ error: "otp not send" });
//                 } else {
//                     console.log("5");
//                     user
//                         .save()
//                         .then((user) => {
//                             console.log("6");
//                             sender
//                                 .sendMail(
//                                     prepareOtpMail({ emailId: user.email, otpCode: user.otpCode })
//                                 )
//                                 .then(() => {
//                                     console.log("7");
//                                     return res.send({
//                                         success: true,
//                                         msg: "otp code was generated",
//                                     });
//                                 })
//                                 .catch((e) => {
//                                     console.log("8");
//                                     console.log(e);
//                                 });
//                         })
//                         .catch((e) => {
//                             console.log("9");
//                             return res.json(e);
//                         });
//                 }
//             });
//         })
//         .catch((e) => {
//             console.log("10");
//             return res.json(e);
//         });
// };
//customer delete by themselves
// router.delete("/customer/delete", auth.verifyCustomer, function(req, res){
//     const id = req.customerInfo._id;
//     customer.findByIdAndDelete(id).then().catch();

// })

//customer delete by other user
// router.delete("/customer/delete/admin", auth.verifyAdmin, function(req, res){
//     const id = req.adminInfo._id; //admin id
//     const cid= req.body.cid //customer id which id to be deleted
//     customer.deleteOne({_id: cid}).then().catch()

// })


// router.delete("/test", auth.verifyCustomer, function(req, res) {  
//     res.json({msg: "deleted!"})
// })

/*route.post('/product/insert', upload.single('pimage'), function(req, res){
    if (req.file == undefined){
        return res.json({
            message: 'only the jpeg file allowed!'
        })
    }
    const product = new Product({
        pname: pname,
        pprice: pprice,
        file_name: file.filename
    })
    product.save().then().catch()
} */


//to show the profile of the customer
router.get("/customer/pofile", auth.verifyCustomer, function (req, res) {
    res.json({
        username: req.customerInfo.username,
        email: req.customerInfo.email,
        address: req.customerInfo.address
    })
})


module.exports = router;