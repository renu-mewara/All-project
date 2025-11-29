const categoriesModel = require('../../model/categories');
const subcategoriesModel = require('../../model/subcategories');

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

exports.viewcategory = async (request, response) => {
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
        await categoriesModel.find(filter).select('name image order status').sort({  _id: 'desc' })
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

    var data = request.body;

    if(request.body.name){
        var slug = slugify(request.body.name, {
            lower: true,
            strict: true,
        });
        data.slug = await generateUniqueSlug(subcategoriesModel, slug);
    }
    if(request.body.parent_categories_id){
    data.parent_categories = request.body.parent_categories_id;
}


    if(request.file){
        data.image = request.file.filename;
    }

    try {

        var saveData = new subcategoriesModel(data).save()
            .then(async(result) => {

                await categoriesModel.updateOne({ _id: request.body.parent_categories_id }, { $push: { sub_categories: { $each: [result._id] } } });

                const data = {
                    _status: true,
                    _message: 'Record created succussfully !!',
                    _data: result
                }
                response.send(data);
            })
            .catch((error) => {

                var errors = [];

                for (var i in error.errors) {
                    errors.push(error.errors[i].message);
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
        if (addCondition.length > 0) {
            var filter = { $and: addCondition }
        } else {
            var filter = {}
        }

        if (orCondition.length > 0) {
            filter.$or = orCondition;
        }
        total_records = await subcategoriesModel.find(filter).countDocuments();
        await subcategoriesModel.find(filter)
        .select(' parent_categories name image order status')
        .populate('parent_categories','name')
        .skip(skip).limit(limit).sort({  _id: 'desc' })
            .then((result) => {
                if (result.length > 0) {

                    var paginate = {
                        current_page: current_page,
                        total_records: total_records,
                        total_pages: Math.ceiltotal_records / limit,
                    }

                    const data = {
                        _status: true,
                        _message: 'categories found successfully',
                     _paginate: paginate,
                    _image_url : process.env.category_image,
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
        data.slug =  await generateUniqueSlug(categoriesModel,slug)

    data.updated_at = Date.now();
    if (request.file && request.file.name) {
        data.image = request.file.filename;
    }
        var savedata =  await subcategoriesModel.updateOne({ _id: request.params.id }, { $set: data }, ) 
            .then(async(result) => {
                if (result.matchedCount == 1) {
                     await categoriesModel.updateOne({ _id: request.body.parent_categories }, { $push: { sub_categories: { $each: [result._id] } } });
                    

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
        var savedata =  await subcategoriesModel.updateMany({ _id: request.body.ids }, { $set: data }, ) 
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
        await subcategoriesModel.findById(request.params.id)
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
        var savedata =  await subcategoriesModel.updateMany({
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
