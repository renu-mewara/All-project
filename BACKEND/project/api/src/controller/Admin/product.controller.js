const colormodel = require('../../model/color');
const materialmodel = require('../../model/material');
const productmodel = require('../../model/product');
const subsubcategoriesModel = require('../../model/subsubcategories');

const env = require('dotenv').config();
var slugify = require('slugify')


const generateUniqueSlug = async (Model, baseSlug) => {
  let slug = baseSlug;
  let count = 0;

  // Loop to find unique slug
  while (await Model.findOne({ slug })) {
    count++;
    slug = `${baseSlug}-${count}`;
  }

  return slug;
};
exports.viewmaterials = async (request, response) => {
    try {
        const addCondition = [
            {
                deleted_at: null,
                // name: { $exists: true}
            }
        ];
        const orCondition = [
            {
            status : true,
            }
        ];
        if (request.body.id != undefined) {
            if (request.body.id != '') {
                orCondition.push({ _id: request.body.id })
            }
        }
        
        
        if (addCondition.length > 0) {
            var filter = { $and: addCondition }
        } else {
            var filter = {}
        }

        if (orCondition.length > 0) {
            filter.$or = orCondition;
        }
        await materialmodel.find(filter).select('_id name parent_categories').sort({  _id: 'desc' })
            .then((result) => {
                if (result.length > 0) {

                    const data = {
                        _status: true,
                        _message: 'categories found successfully',
                         _data: result,


                    };
                    response.send(data);
                } else {
                    const data = {
                        _status: false,
                        _message: 'No categories found',
                        _data: []
                    };
                    response.send(data);
                }
            })
            .catch((error) => {
                const data = {
                    _status: false,
                    _message: 'somthing went wrong',
                    _data: [],
                    _error: error
                };
                response.send(data);
            });
    } catch (error) {
        console.log(error);
        const data = {
            _status: false,
            _message: 'somthing went wrong',
            _data: [],
            _error: error
        };
        response.send(data);

    }
};
exports.viewcolors = async (request, response) => {
    try {
        const addCondition = [
            {
                deleted_at: null,
                // name: { $exists: true}
            }
        ];
        const orCondition = [
            {
            status : true,
            }
        ];
        if (request.body.id != undefined) {
            if (request.body.id != '') {
                orCondition.push({ _id: request.body.id })
            }
        }
        
        
        if (addCondition.length > 0) {
            var filter = { $and: addCondition }
        } else {
            var filter = {}
        }

        if (orCondition.length > 0) {
            filter.$or = orCondition;
        }
        await colormodel.find(filter).select('_id name parent_categories').sort({  _id: 'desc' })
            .then((result) => {
                if (result.length > 0) {

                    const data = {
                        _status: true,
                        _message: 'categories found successfully',
                         _data: result,


                    };
                    response.send(data);
                } else {
                    const data = {
                        _status: false,
                        _message: 'No categories found',
                        _data: []
                    };
                    response.send(data);
                }
            })
            .catch((error) => {
                const data = {
                    _status: false,
                    _message: 'somthing went wrong',
                    _data: [],
                    _error: error
                };
                response.send(data);
            });
    } catch (error) {
        console.log(error);
        const data = {
            _status: false,
            _message: 'somthing went wrong',
            _data: [],
            _error: error
        };
        response.send(data);

    }
};
exports.viewsubsubcategory = async (request, response) => {
    try {
        const addCondition = [
            {
                deleted_at: null,
                // name: { $exists: true}
            }
        ];
        const orCondition = [
            {
            status : true,
            }
        ];
        if (request.body.id != undefined) {
            if (request.body.id != '') {
                orCondition.push({ _id: request.body.id })
            }
        }
         if (request.body.parent_categories != undefined) {
            if (request.body.parent_categories != '') { 
                addCondition.push({ parent_categories: request.body.parent_categories })
            }
        }
         if (request.body.sub_categories != undefined) {
            if (request.body.sub_categories != '') { 
                addCondition.push({ sub_categories: request.body.sub_categories })
            }
        }
        
        if (addCondition.length > 0) {
            var filter = { $and: addCondition }
        } else {
            var filter = {}
        }

        if (orCondition.length > 0) {
            filter.$or = orCondition;
        }
        await subsubcategoriesModel.find(filter).select('_id name parent_categories sub_categories').sort({  _id: 'desc' })
            .then((result) => {
                if (result.length > 0) {

                    const data = {
                        _status: true,
                        _message: 'categories found successfully',
                         _data: result,


                    };
                    response.send(data);
                } else {
                    const data = {
                        _status: false,
                        _message: 'No categories found',
                        _data: []
                    };
                    response.send(data);
                }
            })
            .catch((error) => {
                const data = {
                    _status: false,
                    _message: 'somthing went wrong',
                    _data: [],
                    _error: error
                };
                response.send(data);
            });
    } catch (error) {
        console.log(error);
        const data = {
            _status: false,
            _message: 'somthing went wrong',
            _data: [],
            _error: error
        };
        response.send(data);

    }
};
exports.create = async(request, response) => {
    if(request.body){
        var data = request.body;
        if(request.body.name){
        var slug = slugify(request.body.name, {
            lower: true,
            strict: true,
        });
        data.slug = await generateUniqueSlug(productmodel, slug);
    }
    }else{
        var data = {};
    }
    // if(request.file){
    //     data.image = request.file.filename;
    // }

    try {

        var saveData = new productmodel(data).save()
            .then(async(result) => {
                const data = {
                    _status: true,
                    _message: 'Record created succussfully !!',
                    _data: result
                }
                response.send(data);
            })
            .catch((error) => {

                // var errors = [];
                // for (var i in error.errors) {
                //     errors.push(error.errors[i].message);
                // }
                var errors = {};
                for (var i in error.errors) {
                    errors[i]=error.errors[i].message;
                }

                const data = {
                    _status: false,
                    _message: 'Something went wrong !!',
                    _error: errors,
                    _data: null
                }
                response.send(data);
            });

    } catch (error) {
        const data = {
            _status: false,
            _message: 'Something went wrong !!',
            _error: error,
            _data: null
        }
        response.send(data);
    }
}
exports.view = async (request, response) => {

    var current_page = 1;
    var total_records = 0;
    var total_pages = 0;
    var limit = 15;
    var skip = 0;
    if (request.query.page) {
        current_page = parseInt(request.query.page);
        skip = (current_page - 1) * limit;
    }

    try {
        var conditions = {
            deleted_at: null,
            // status : true
        };
        const addCondition = [
            {
                deleted_at: null,
                name: { $exists: true}
            }
        ];

        const orCondition = [];
        if (request.body.name != undefined) {
            if (request.body.name != '') {
                var name = new RegExp(request.body.name, 'i');
                addCondition.push({ name: name })
            }
        }
        if (request.body.parent_categories_id != undefined) {
            if (request.body.parent_categories_id != '') {
                addCondition.push({ parent_categories: request.body.parent_categories_id })
            }
        }
        if (request.body.sub_categories_id != undefined) {
            if (request.body.sub_categories_id != '') {
                addCondition.push({ sub_categories: request.body.sub_categories_id })
            }
        }
        if (addCondition.length > 0) {
            var filter = { $and: addCondition }
        } else {
            var filter = {}
        }
        if (orCondition.length > 0) {
            filter.$or = orCondition;
        }
        total_records = await productmodel.find(filter).countDocuments();
        await productmodel.find(filter)
        // .select(' parent_categories sub_categories name image order status')
        .populate('parent_categories','name')
         .populate('sub_categories','name')
         .populate('material_ids', 'name')
        .populate('color_ids', 'name')
        .populate('sub_sub_categories', 'name')
         
        .skip(skip).limit(limit).sort({  _id: 'desc' })
            .then((result) => {
                if (result.length > 0) {

                    var paginate = {
                        current_page: current_page,
                        total_records: total_records,
                        total_pages: Math.ceil(total_records / limit),

                    }

                    const data = {
                        _status: true,
                        _message: 'categories found successfully',
                     _paginate: paginate,
                    _image_url : process.env.product_image,
                     _data: result,

                    };
                    response.send(data);
                } else {
                    const data = {
                        _status: false,
                        _message: 'No categories found',
                        _data: []
                    };
                    response.send(data);
                }
            })
            .catch((error) => {
                const data = {
                    _status: false,
                    _message: 'somthing went wrong',
                    _data: [],
                    _error: error
                };
                response.send(data);
            });
    } catch (error) {
        const data = {
            _status: false,
            _message: 'somthing went wrong',
            _data: [],
            _error: error
        };
        response.send(data);

    }
};
exports.update = async(request, response) => {
try {

    var data = request.body;


        var slug = slugify(request.body.name,{
            lower : true,
            strict : true
        });
        data.slug =  await generateUniqueSlug(productmodel,slug)

    data.updated_at = Date.now();
    // if (request.file && request.file.name) {
    //     data.image = request.file.filename;
    // }
        var savedata =  await productmodel.updateOne({ _id: request.params.id }, { $set: data }, ) 
            
            .then(async(result) => {
                if (result.matchedCount == 1) {

                const data = {
                    _status: true,
                    _message: 'categories updated successfully',
                    _data: result
                };
                response.send(data);
            } else {
                const data = {
                    _status: false,
                    _message: 'No categories found',
                    _data: null
                };
                response.send(data);
            }
            })
            .catch((error) => {


                var errors = [];
                for (var i in error.errors) {
                    errors.push(error.errors[i].message);
                }
                const data = {
                    _status: false,
                    _message: 'somthing went wrong',
                    _data: null,
                    _error: errors
                };
                response.send(data);
            });
    } catch (error) {
        const data = {
            _status: false,
            _message: 'somthing went wrong',
            _data: null,
            _error: error
        };
        response.send(data);

    }};
exports.destroy = async(request, response) => {
    try {

    var data ={
        deleted_at : Date.now()
    }
        var savedata =  await productmodel.updateMany({ _id: request.body.ids }, { $set: data }, ) 
            .then((result) => {
                if (result) {

                const data = {
                    _status: true,
                    _message: 'categories deleted successfully',
                    _data: result
                };
                response.send(data);
            } else {
                const data = {
                    _status: false,
                    _message: 'No categories found',
                    _data: null
                };
                response.send(data);
            }
            })
            .catch((error) => {
                var errors = [];
                for (var i in error.errors) {
                    errors.push(error.errors[i].message);
                }
                const data = {
                    _status: false,
                    _message: 'somthing went wrong',
                    _data: null,
                    _error: errors
                };
                response.send(data);
            });
    } catch (error) {
        const data = {
            _status: false,
            _message: 'somthing went wrong',
            _data: null,
            _error: error
        };
        response.send(data);

    }};

exports.detail = async(request, response) => {
     try {
        await productmodel.findById(request.params.id)
            .then((result) => {
                if (result) {

                    const data = {
                        _status: true,
                        _message: 'categories found successfully',
                         _image_url : process.env.category_image,
                        _data: result,
                        
                    };
                    response.send(data);
                } else {
                    const data = {
                        _status: false,
                        _message: 'No categories found',
                        _data: null
                    };
                    response.send(data);
                }
            })
            .catch((error) => {
                const data = {
                    _status: false,
                    _message: 'somthing went wrong',
                    _data: null,
                    _error: error
                };
                response.send(data);
            });
    } catch (error) {
        const data = {
            _status: false,
            _message: 'somthing went wrong',
            _data: [],
            _error: error
        };
        response.send(data);

    }
};
exports.changeStatus = async(request, response) => {
    try {
        var savedata =  await productmodel.updateMany({
            _id: request.body.ids
         },[{ 
             $set: {
                status : {
                    $not : "$status"
                }
             } 
            } ]) 
            .then((result) => {
                if (result) {

                const data = {
                    _status: true,
                    _message: 'Change status successfully',
                    _data: result
                };
                response.send(data);
            } else {
                const data = {
                    _status: false,
                    _message: 'No categories found',
                    _data: null
                };
                response.send(data);
            }
            })
            .catch((error) => {


                var errors = [];
                for (var i in error.errors) {
                    errors.push(error.errors[i].message);
                }
                const data = {
                    _status: false,
                    _message: 'somthing went wrong',
                    _data: null,
                    _error: errors
                };
                response.send(data);
            });
    } catch (error) {
        const data = {
            _status: false,
            _message: 'somthing went wrong',
            _data: null,
            _error: error
        };
        response.send(data);

    }};
