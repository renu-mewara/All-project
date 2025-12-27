    const mongoose = require('mongoose');

    const orderschema = new mongoose.Schema({

        user_id : {
            type : String,
            required : [true, 'User ID is required'],
        },
        order_id : {
            type : String,
            default : '',
        },
        order_number : {
            type : String,
            default : '',
        },
        payment_id : {
            type : String,
            default : '',
        },
        name : {
            type : String,
            required : [true, 'Name is required'],
            match: /^[a-zA-Z ]{2,15}$/,      
        },
        mobile_number : {
            type : Number,
            required : [true, 'Mobile number is required'],
            match: /^[0-9]{8,15}$/,
        },
        billing_address : {
            type : Object,
            required : [true, 'Billing address is required'],
        },
        shipping_address : {
            type : Object,
            required : [true, 'Shipping address is required'],
        },
        order_notes : {
            type : String,
            default : '',
        },
        product_info : {
            type : Array,
            required : [true, 'Product information is required'],   
        },
        total_amount : {
            type : Number,
            required : [true, 'Total amount is required'],  
        },
        discount_amount : {
            type : Number,
            default : 0,
        },
        final_amount : {
            type : Number,
            required : [true, 'Final amount is required'],
        },
        order_status : {
            type : Number,
            enum : [1,2,3,4,5,6,7,8],
            default : 1,//  1 - order placed, 2 - Ready to ship, 3 - shipped, 4 - in transist, 5 - Delivered, 6 - cancelled 7 - returned 8- refund initiated
        },
         payment_status : {
            type : Number,
            enum : [1,2,3],
            default : 1,//  1-pending, 2-sucess, 3- failled
        },
         payment_type : {
            type : String,
            enum : ['COD','online'],
           required : [true,'payment type is required']
        },
       
        status : {
            type : Boolean,
            default : 1
        },   // 0 - InActive 1 - Active
        order : {
            type : Number,
            default : 0,
            min : [0,'minimum value is 0'],
            max : 1000
        },
        created_at : {
            type : Date,
            default : Date.now
        },
        updated_at : {
            type : Date,
            default : Date.now
        },
        deleted_at : {
            type : Date,
            default : null
        },
    });
const ordermodel = mongoose.model('order', orderschema);
    module.exports = ordermodel;