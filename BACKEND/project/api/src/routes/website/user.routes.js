const express = require('express');
var jwt = require('jsonwebtoken');

const { register, login, viewprofile, updateprofile, changepassword, forgetpassword, resetpassword } = require('../../controller/website/user.controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads/user' });
const Path = require('path');
const router = express.Router();


module.exports = server => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/user')
        },
        filename: function (req, file, cb) {
            extension = Path.extname(file.originalname);
            const uniqueSuffix = Date.now()+extension;
            
            cb(null, file.fieldname + '-' + uniqueSuffix)
        }
    })

    const uploads = multer({ storage: storage })

    const singleimage = uploads.single('image');
   
    router.post('/register', upload.none(), register);
    router.post('/login', upload.none(), login);
    router.post('/view-profile/', upload.none(), viewprofile);
    router.put('/update-profile/', singleimage, updateprofile);
    router.put('/change-password', upload.none(), changepassword);
    router.post('/forget-password', upload.none(), forgetpassword);
    router.put('/reset-password/', upload.none(), resetpassword);
    server.use('/api/website/user', router);
};