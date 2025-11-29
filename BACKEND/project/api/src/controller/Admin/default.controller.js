const defaultModel = require('../../model/default');
const env = require('dotenv').config();
exports.create = async (request, response) => {
    
    var data = request.body;
    if (request.file) {
        data.image = request.file.filename;
    }


    try {
        var savedata = await new defaultModel(data).save()
            .then((result) => {
                const data = {
                    _status: true,
                    _message: 'Default created successfully',
                    _data: result
                };
                response.send(data);
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

    }
};
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
        if (addCondition.length > 0) {
            var filter = { $and: addCondition }
        } else {
            var filter = {}
        }

        if (orCondition.length > 0) {
            filter.$or = orCondition;
        }
        total_records = await defaultModel.find(filter).countDocuments();
        await defaultModel.find(filter).select('name image order status').skip().limit(limit).sort({  _id: 'desc' })
            .then((result) => {
                if (result.length > 0) {

                    var paginate = {
                        current_page: current_page,
                        total_records: total_records,
                        total_pages: Math.ceiltotal_records / limit,
                    }

                    const data = {
                        _status: true,
                        _message: 'Default found successfully',
                     _paginate: paginate,
                        _image_url : process.env.default_image,
                     _data: result,


                    };
                    response.send(data);
                } else {
                    const data = {
                        _status: false,
                        _message: 'No Default found',
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
    data.updated_at = Date.now();
    if (request.file) {
        data.image = request.file.filename;
    }
        var savedata =  await defaultModel.updateOne({ _id: request.params.id }, { $set: data }, ) 
            .then((result) => {
                if (result.matchedCount == 1) {

                const data = {
                    _status: true,
                    _message: 'Default updated successfully',
                    _data: result
                };
                response.send(data);
            } else {
                const data = {
                    _status: false,
                    _message: 'No Default found',
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
        var savedata =  await defaultModel.updateMany({ _id: request.params.ids }, { $set: data }, ) 
            .then((result) => {
                if (result) {

                const data = {
                    _status: true,
                    _message: 'Default deleted successfully',
                    _data: result
                };
                response.send(data);
            } else {
                const data = {
                    _status: false,
                    _message: 'No Default found',
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
        await defaultModel.findById(request.params.id)
            .then((result) => {
                if (result) {

                    const data = {
                        _status: true,
                        _message: 'Default found successfully',
                         _image_url : process.env.default_image,
                        _data: result,
                        
                    };
                    response.send(data);
                } else {
                    const data = {
                        _status: false,
                        _message: 'No Default found',
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
        var savedata =  await materialmodel.updateMany({
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
                    _message: 'No Default found',
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
