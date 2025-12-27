    const mongoose = require('mongoose');

    const userschema = new mongoose.Schema({
        name : {
            type : String,
            // required : [true, 'Name is required'],
            match: /^[a-zA-Z ]{2,15}$/,      
        },
        email : {
            type : String,
            required : [true, 'email is required'],
            match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            validate: {
                        validator: async function(v) {
                        const data = await this.constructor.findOne({ email: v , deleted_at: null });
                        return !data;
                        },
                        message: props => `The specified data is already in use.`
                    }
              
        },
        password : {    
            type : String,
            default : '',
            required : [true, 'Password is required'],
        },
        mobile_no : {
            type : Number,
            default : '',
        },
        gender : {
            type : String,
            default : '',
        },
        image : {
            type : String,
            default : '',
        },
        role_type : {
            type : String,
            enum : ['admin','user'],
            default : '',
            required : [true, 'Role type is required'],
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
const usermodel = mongoose.model('user', userschema);
    module.exports = usermodel;