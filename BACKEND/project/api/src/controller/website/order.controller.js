const ordermodel = require('../../model/order');
const env = require('dotenv').config();
var jwt = require('jsonwebtoken');
const Razorpay = require('razorpay');
var instance = new Razorpay({
    key_id: 'rzp_test_WAft3lA6ly3OBc',
    key_secret: '68E17CNWY8SemCvZ6ylOkuOY',
});

exports.placeorder = async (request, response) => {
    try {
        token = request.headers.authorization.split(' ');
        var decoded = jwt.verify(token[1], process.env.secret_key);
        if (!decoded) {
            const data = {
                _status: false,
                _message: 'Invalid Token',
                _data: null
            };
            response.send(data);
            return;
        }
        var data = request.body;
        data.user_id = decoded.user_info._id
        var totalorders = await ordermodel.countDocuments();
        totalorders = 1000 + totalorders;
        data.order_number = 'MONSTA_' + totalorders

        await ordermodel(data).save()

            .then(async (result) => {
                const ordercreate = await instance.orders.create({
                    "amount": request.body.final_amount * 100,
                    "currency": "INR",
                    "receipt": result._id,
                    "partial_payment": false,
                })
                await ordermodel.updateOne({
                    _id: result._id
                }, {
                    $set: {
                        order_id: ordercreate.id
                    }
                })
                var orderinfo = await ordermodel.findById(result._id)

                    const data = {
                        _status: true,
                        _message: 'Order Placed successfully',
                        _order_create: ordercreate,
                        _data: orderinfo,
                    };
                    response.send(data);
                
            })
            .catch((error) => {
                var errors = [];
                for (var i in error.errors) {
                    errors.push(error.errors[i].message);
                };
                const data = {
                    _status: false,
                    _message: 'somthing went wrong',
                    _data: null,
                    _error: error.message
                };
                response.send(data);
            });
    } catch (error) {
        const data = {
            _status: false,
            _message: 'somthing went wrong',
            _data: [],
            _error: error.message
        };
        response.send(data);

    }
};
exports.orderstatus = async (request, response) => {
    try {
        token = request.headers.authorization.split(' ');
        var decoded = jwt.verify(token[1], process.env.secret_key);

        if (!decoded) {
            const data = {
                _status: false,
                _message: 'Invalid token value !',
                _data: ''
            }

            response.send(data);
        }
        var userInfo = await usermodel.findById(decoded.userInfo._id);

        console.log(userInfo);

        const checkPassword = await bcrypt.compare(request.body.current_password, userInfo.password);

        if (!checkPassword) {
            const data = {
                _status: false,
                _message: 'Password is incorrect !',
                _data: ''
            }

            response.send(data);
        }

        if (request.body.new_password != request.body.confirm_password) {
            const data = {
                _status: false,
                _message: 'New Password and Confirm Password must be same !',
                _data: ''
            }

            response.send(data);
        }

        if (request.body.current_password == request.body.confirm_password) {
            const data = {
                _status: false,
                _message: 'Current Password and New Password cannot be same !',
                _data: ''
            }

            response.send(data);
        }

        password = await bcrypt.hash(request.body.new_password, saltRounds);

        await usermodel.updateOne({
            _id: decoded.userInfo._id
        }, {
            $set: {
                password: password
            }
        })
            .then((result) => {
                if (result) {
                    const data = {
                        _status: true,
                        _message: 'Password change succussfully !!',
                        _data: result
                    }
                    response.send(data);
                } else {
                    const data = {
                        _status: false,
                        _message: 'No Record found !!',
                        _data: result
                    }
                    response.send(data);
                }

            })
            .catch((error) => {
                console.log(error)
                const data = {
                    _status: false,
                    _message: 'Something went wrong !!',
                    _error: error,
                    _data: null
                }
                response.send(data);
            });

    } catch (error) {
        console.log(error)
        const data = {
            _status: false,
            _message: 'Something went wrong !!',
            _error: error,
            _data: null
        }
        response.send(data);
    }
};
exports.vieworder = async (request, response) => {
    try {
        token = request.headers.authorization.split(' ');
        var decoded = jwt.verify(token[1], process.env.secret_key);
        if (!decoded) {
            const data = {
                _status: false, 
                _message: 'Invalid Token',
                _data: null
            };
            response.send(data);
            return;
        }
        var orders = await ordermodel.find({user_id:decoded.user_info._id}).sort({_id:-1});
        const data = {
            _status: true,  
            _message: 'Order List Fetched successfully',
            _data: orders
        };
        response.send(data);
    } catch (error) {
        const data = {
            _status: false,
            _message: 'somthing went wrong',
            _data: [],
            _error: error.message
        };
        response.send(data);    
    }
}



