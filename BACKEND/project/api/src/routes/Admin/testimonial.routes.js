const express = require('express');
const { create, view, detail, update, destroy, changeStatus } = require('../../controller/Admin/testimonial.controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads/category' });
const Path = require('path');

const router = express.Router();


module.exports = server => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/category')
        },
        filename: function (req, file, cb) {
            extension = Path.extname(file.originalname);
            const uniqueSuffix = Date.now()+extension;
            
            cb(null, file.fieldname + '-' + uniqueSuffix)
        }
    })

    const uploads = multer({ storage: storage })

    const singleimage = uploads.single('image');
   
    
    router.post('/create', singleimage, create);
    router.post('/view', upload.none(), view)
    router.post('/detail/:id', upload.none(), detail);
    router.put('/update/:id', singleimage, update);
    router.put('/delete', upload.none(), destroy);
    router.post('/change-status', upload.none(), changeStatus);
    server.use('/api/admin/testimonial', router);
};