const req = require("mongoose");

const Customer= require("./customerModel");

const Product = new req.Mongoose.Schema({
    fname:{
        type:String
    },

    fdesc:{
        type:String
    },

    fprice:{
        type:String
    },

    imagee:{
        type:String
    },

    userId: {
        type: req.Mongoose.Schema.Types.ObjectId,
        ref:Customer
    }
})

module.exports= Mongoose.model("Product", Product)