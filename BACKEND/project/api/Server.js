const express  = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const env = require('dotenv').config();
const mongoose = require('mongoose');

const server = express(); // Executable Function

// parse requests of content-type - application/json
server.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

server.use(bodyParser.json());

server.use(cors());

server.get('/', (request, response) => {
    response.send('Server is working fine !!');
});

server.use('/uploads/default', express.static('uploads/default'));
server.use('/uploads/category', express.static('uploads/category'));
server.use('/uploads/product', express.static('uploads/product'));

// Website API URLs
require('./src/routes/website/user.routes.js')(server);


// Admin API URls
require('./src/routes/Admin/default.routes.js')(server);
require('./src/routes/Admin/color.routes.js')(server);
require('./src/routes/Admin/material.routes.js')(server);
require('./src/routes/Admin/categories.routes.js')(server);
require('./src/routes/Admin/subcategories.routes.js')(server);
require('./src/routes/Admin/subsubcategories.routes.js')(server);
require('./src/routes/Admin/choose.routes.js')(server);
require('./src/routes/Admin/slider.routes.js')(server);
require('./src/routes/Admin/countary.routes.js')(server);
require('./src/routes/Admin/testimonial.routes.js')(server);
require('./src/routes/Admin/faq.routes.js')(server);
require('./src/routes/Admin/product.routes.js')(server);
mongoose.connect(`mongodb+srv://${process.env.user_name}:${process.env.password}@cluster0.fkcdakx.mongodb.net/${process.env.db_name}?appName=Cluster0`)

 
.then(() => console.log('Connected!'))
.catch((error) => {
    console.log(error);
});

server.listen(process.env.PORT, () => {
    console.log('Server is working fine !!');
})



