const express = require('express');
const {  viewmaterials, viewcolors , create, view, detail, update, destroy, changeStatus, viewsubsubcategory } = require('../../controller/Admin/product.controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads/product' });
const Path = require('path');
const { viewcategory } = require('../../controller/Admin/subcategories.controller');
const { viewsubcategory } = require('../../controller/Admin/subsubcategories.controller');

const router = express.Router();
module.exports = server => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/product')
        },
        filename: function (req, file, cb) {
            extension = Path.extname(file.originalname);
            const uniqueSuffix = Date.now()+extension;
            cb(null, file.fieldname + '-' + uniqueSuffix)
        }
    })

    const uploads = multer({ storage: storage })
    const singleimage = uploads.single('image');
    const imageuploads = upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'images', maxCount: 10 }
    ]);
    router.post('/view-materials', upload.none(), viewmaterials)
    router.post('/view-colors', upload.none(), viewcolors)
    router.post('/view-categories', upload.none(), viewcategory)
    router.post('/view-sub-categories', upload.none(), viewsubcategory)
    router.post('/view-sub-sub-categories', upload.none(), viewsubsubcategory)
    router.post('/create', imageuploads, create);
    router.post('/view', upload.none(), view)
    router.post('/detail/:id', upload.none(), detail);
    router.put('/update/:id', imageuploads, update);
    router.put('/delete', upload.none(), destroy);
    router.post('/change-status', upload.none(), changeStatus);
    server.use('/api/admin/product', router);
};