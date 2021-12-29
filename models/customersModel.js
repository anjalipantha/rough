const mongoose = require('mongoose');

const Customer = mongoose.model("Customers",
{
    username:{
        type: String
    },
    password:{
        type: String
    },
    address:{
        type: String
    },
    email:{
        type: String
    }

})

module.exports= Customer;