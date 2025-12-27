const usermodel = require('../../model/user');
const env = require('dotenv').config();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const nodemailer = require('nodemailer');

exports.register = async (request, response) => {
  try {
    let datasave = request.body;
    datasave.role_type = 'user';
    datasave.password = await bcrypt.hash(datasave.password, saltRounds);

    const result = await usermodel(datasave).save();

    const token = jwt.sign(
      { user_info: result },
      process.env.secret_key
    );

    const data = {
      _status: true,
      _message: 'Register successfully',
      _data: result,
      _token: token
    };

    return response.send(data);

  } catch (error) {
    let errors = [];

    if (error.errors) {
      for (let i in error.errors) {
        errors.push(error.errors[i].message);
      }
    } else {
      errors.push(error.message);
    }

    const data = {
      _status: false,
      _message: 'Something went wrong',
      _data: '',
      _error: errors
    };

    return response.status(400).send(data);
  }
};

exports.login = async (request, response) => {
    const checkemail = await usermodel.findOne({ email: request.body.email, deleted_at: null });
    if (checkemail == null) {
        const data = {
            _status: false,
            _message: 'invalid email address',
            _data: '',
        };
        response.send(data);

    }
    if (!await bcrypt.compare(request.body.password, checkemail.password)) {
        const data = {
            _status: false,
            _message: 'invalid password',
            _data: '',
        };
        response.send(data);
    }
    if (checkemail.status == false) {
        const data = {
            _status: false,
            _message: 'your account is inactive please contact to admin',
            _data: '',
        };
        response.send(data);
    }
    var token = jwt.sign({ user_info: checkemail }, (checkemail, process.env.secret_key),)

    const data = {
        _status: true,
        _message: 'login successfully',
        _token: token,
        _data: checkemail,
    };
    response.send(data);
};
exports.viewprofile = async (request, response) => {
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
        await usermodel.findById(decoded.user_info._id)
            .then((result) => {
                if (result) {


                    const data = {
                        _status: true,
                        _message: 'record found successfully',
                        _image_url: process.env.user_image,
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
exports.updateprofile = async (request, response) => {
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
        if (request.file) {
            data.image = request.file.filename;
        }
        await usermodel.findByIdAndUpdate({
            _id: decoded.user_info._id
        }, {
            $set: {
                set: data
            }


        })
            .then((result) => {
                if (result) {
                    const data = {
                        _status: true,
                        _message: 'record update successfully',
                        _image_url: process.env.user_image,
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
exports.changepassword = async (request, response) => {
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

exports.forgetpassword = async (request, response) => {
    const userCheck = await usermodel.findOne({ email: request.body.email });
    if (!userCheck) {
        const data = {
            _status: false,
            _message: 'Email id does not exit  !',
            _data: ''
        }
        response.send(data);
        return;
    }
    // Generate a short-lived reset token (1 hour)
    try {
        const token = jwt.sign({ id: userCheck._id }, process.env.secret_key);
        // Create transporter (configure environment variables for Email and GMAIL_Password)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.Email,
                pass: process.env.gmail_password,
            },
        });
        var resetUrl = `${process.env.resetUrl}${token}`
        const htmlMessage = `
            <div style="font-family: Arial, sans-serif; line-height:1.6; color:#222;">
              <h2 style="color:#333;">Reset your password</h2>
              <p>Hi ${userCheck.name || userCheck.email},</p>
              <p>We received a request to reset the password for your account. Click the button below to choose a new password. This link will expire in 1 hour.</p>
              <p><a href="${resetUrl}" style="background:#1a73e8;color:#ffffff;padding:10px 16px;border-radius:4px;text-decoration:none;display:inline-block;">Reset Password</a></p>
              <p>If you didn't request a password reset, you can safely ignore this email and your password will remain unchanged.</p>
              <p>Thanks,<br/>Support Team</p>
            </div>
        `;

        await transporter.sendMail({
            from: `"Monsta" <${process.env.Email}>`,
            to: userCheck.email,
            subject: 'Reset your password',
            html: htmlMessage,
        });

        const data = {
            _status: true,
            _message: 'Reset email sent successfully !',
            _data: ''
        }

        response.send(data);
        return;
    } catch (error) {
        console.log('Forgot password error:', error);
        const data = {
            _status: false,
            _message: 'Mail not Send !',
            _error: error,
            _data: ''
        }

        response.send(data);
    }
}
exports.resetpassword = async (request, response) => {
    try {
        token = request.body.token;
        console.log("TOKEN RECEIVED:", request.body.token);
        var decoded = jwt.verify(token, process.env.secret_key);

        if (!decoded) {
            const data = {
                _status: false,
                _message: 'Invalid token value !',
                _data: ''
            }

            response.send(data);
        }

        var userInfo = await usermodel.findById(decoded.id);

        console.log(userInfo);

        // const checkPassword = await bcrypt.compare(request.body.current_password, userInfo.password);


        // if(!checkPassword){
        //     const data = {
        //         _status : false,
        //         _message : 'Password is incorrect !',
        //         _data : ''
        //     }

        //     response.send(data);
        // }

        if (request.body.new_password != request.body.confirm_password) {
            const data = {
                _status: false,
                _message: 'New Password and Confirm Password must be same !',
                _data: ''
            }

            response.send(data);
        }

        password = await bcrypt.hash(request.body.new_password, saltRounds);
        await usermodel.updateOne({
            _id: decoded.id
        }, {
            $set: {
                password: password
            }
        })
            .then((result) => {
                if (result) {
                    const data = {
                        _status: true,
                        _message: 'Password Reset succussfully !!',
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
                    _error: error.message,
                    _data: null
                }
                response.send(data);
            });

    } catch (error) {
        console.log(error)
        const data = {
            _status: false,
            _message: 'Something went wrong !!',
            _error: error.message,
            _data: null
        }
        response.send(data);
    }
};

