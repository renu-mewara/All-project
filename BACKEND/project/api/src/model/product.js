    const mongoose = require('mongoose');
    

    const productschema = new mongoose.Schema({
        name : {
            type : String,
            required : [true, 'Name is required'],
            match: /^[a-zA-Z ]{2,15}$/,
            // validate: {
            //             validator: async function(v) {
            //             const data = await this.constructor.findOne({ name: v , deleted_at: null });
            //             return !data;
            //             },
            //             message: props => `The specified data is already in use.`
            //         }
              
        },
        code : {
            type : String,
            required : [true, 'Code is required'],
        },
         slug : {
            type : String,
            default : ''
            
        },
        image : {
            type : String,
            default : ''     
        },
        images : {
            type : Array,
            default : []     
        },
         color_ids: {
                type: Array,
                ref: 'color',
                default : [],
                required : [true, 'Color is required'],
        },
         material_ids: {
            type: Array,
            ref: 'material',
            default : [],
            required : [true, 'Material is required'],
        },
         actual_price: {
            type: Number,
            default : 0,
            required : [true, 'Actual Price is required'],
        },
         sale_price: {
            type: Number,
            default : 0,
            required : [true, 'Sale Price is required'],
        },
         is_feature: {
            type: Number,
            default : 2, // 1- Yes , 2- No
        },
         is_new_arrival: {
            type: Number,
            default : 2, // 1- Yes , 2- No
        },
         is_onsale: {
            type: Number,
            default : 2, // 1- Yes , 2- No
        },
        is_best_selling: {
            type: Number,
            default : 2, // 1- Yes , 2- No
        },
        is_upselling: {
            type: Number,
            default : 2, // 1- Yes , 2- No
        },
        is_top_rated: {
            type: Number,
            default : 2, // 1- Yes , 2- No
        },
        short_description: {
            type: String,
            default : '',
            required : [true, 'Short Description is required'],
        },
        description: {
            type: String,
            required : [true, 'Long Description is required'],
        },
        quantity: {
            type: Number,
            required : [true, 'Quantity is required'],
        }, 
         extimate_delivery_days: {
            type: String,
            required : [true, 'extimate delivery day is required'],
        },
         dimension: {
            type: String,
            required : [true, ' dimension is required'],
        },
        parent_categories: {
            type: String,
            ref: 'categories',
            default : ''
        },
        sub_categories: {
            type: String,
            ref: 'subcategories',
            default : ''
        },
        sub_sub_categories: {
            type: String,
            ref: 'subsubcategories',
            default : []
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

const productmodel = mongoose.model('product', productschema);
    module.exports = productmodel;