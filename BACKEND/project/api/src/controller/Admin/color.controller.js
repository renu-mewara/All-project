const colormodel = require('../../model/color');
const env = require('dotenv').config();
exports.create = async (request, response) => {
    
    var data = request.body;
    


    try {
        var savedata = await new colormodel(data).save()
            .then((result) => {
                const data = {
                    _status: true,
                    _message: 'Record created successfully',
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
  try {
    let current_page = 1;
    let limit = 5;
    let skip = 0;

    if (request.body.page) {
      current_page = parseInt(request.body.page);
      skip = (current_page - 1) * limit;
    }

    // 🟢 Safe filter setup
    const filter = {
      $or: [
        { deleted_at: null },
        { deleted_at: { $exists: false } }
      ]
    };

    // 🟢 Apply optional search (name/code)
    if (request.body.name && request.body.name.trim() !== "") {
      filter.name = new RegExp(request.body.name, 'i');
    }

    if (request.body.code && request.body.code.trim() !== "") {
      filter.code = new RegExp(request.body.code, 'i');
    }

    // 🟢 Debug log
    console.log("📢 Filter Applied:", filter);

    const total_records = await colormodel.countDocuments(filter);

    const result = await colormodel
      .find(filter)
      .select('name code order status')
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 });

    console.log("📢 DB Result Count:", result.length);

    if (result.length > 0) {
      const paginate = {
        current_page,
        total_records,
        total_pages: Math.ceil(total_records / limit),
      };

      response.send({
        _status: true,
        _message: 'Record found successfully',
        _paginate: paginate,
        _data: result,
      });
    } else {
      response.send({
        _status: false,
        _message: 'No records found',
        _data: [],
      });
    }

  } catch (error) {
    console.log("🔥 View Error (Inside Catch):", error);
    response.send({
      _status: false,
      _message: 'Something went wrong',
      _data: [],
      _error: error,
    });
  }
};

exports.update = async(request, response) => {
try {

    var data = request.body;
    data.updated_at = Date.now();
    
        var savedata =  await colormodel.updateOne({ _id: request.params.id }, { $set: data }, ) 
            .then((result) => {
                if (result.matchedCount == 1) {

                const data = {
                    _status: true,
                    _message: 'Record updated successfully',
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
        var savedata =  await colormodel.updateMany({ _id: request.body.ids }, { $set: data }, ) 
            .then((result) => {
                if (result) {
                const data = {
                    _status: true,
                    _message: 'Record deleted successfully',
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
        await colormodel.findById(request.params.id)
            .then((result) => {
                if (result) {

                    const data = {
                        _status: true,
                        _message: 'Record found successfully',
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
        var savedata =  await colormodel.updateMany({
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
