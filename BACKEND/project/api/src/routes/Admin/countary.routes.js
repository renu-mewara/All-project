const express = require('express');
const { create, view, detail, update, destroy, changeStatus } = require('../../controller/Admin/countary.controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const Path = require('path');

const router = express.Router();


module.exports = server => {

   
    router.post('/create', upload.none(), create);
    router.post('/view', upload.none(), view)
    router.post('/detail/:id', upload.none(), detail);
    router.put('/update/:id', upload.none(), update);
    router.put('/delete', upload.none(), destroy);
    router.put('/change-status', upload.none(), changeStatus);
    server.use('/api/admin/countary', router);
};