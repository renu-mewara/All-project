const express = require('express');
var jwt = require('jsonwebtoken');

const { placeorder,orderstatus,vieworder} = require('../../controller/website/order.controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads' });
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
   
    router.post('/place-order', upload.none(), placeorder);
    router.post('/order-status',upload.none(), orderstatus);
    router.post('/view-order',upload.none(), vieworder);
    
    server.use('/api/website/order', router);
};