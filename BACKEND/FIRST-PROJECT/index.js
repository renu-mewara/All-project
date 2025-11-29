const express = require('express');
const { properties, users, products, post } = require('./data');
const server = express();
const validation = require('./middelweare.js')

const route = express.Router();
route.use(validation)

    server.get('/', (request, response)=>{
        response.send('record found!!');
    });

        // application level middelweare
    server.get('/api/properties', validation, (request, response)=>{

       
        if(users.length > 0){
            const data = {
                _status : true,
                _message : 'record found successfully!',
                _data : users
            }
            response.send(data)

        }else{
            const data = {
                _status : false,
                _message : ' no record found !',
                _data : []
            }
            response.send(data)
        }


    });  

        // route level middelweare
    route.get('/api/users', (request, response)=>{
        if(users.length > 0){
            const data = {
                _status : true,
                _message : 'record found successfully!',
                _data : users
            }
            response.send(data)

        }else{
            const data = {
                _status : false,
                _message : ' no record found !',
                _data : []
            }
            response.send(data)



        }
    });
    server.use('/', route);

    server.post('/api/products', (request, response)=>{
        
        if(products.length > 0){
            const data = {
                _status : true,
                _message : 'record found successfully!',
                _data : products
            }
            response.send(data)

        }else{
            const data = {
                _status : false,
                _message : ' no record found !',
                _data : []
            }
            response.send(data)



        }
    });

     server.post('/api/post', (request, response)=>{
        if(post.length > 0){
            const data = {
                _status : true,
                _message : 'record found successfully!',
                _data : post
            }
            response.send(data)

        }else{
            const data = {
                _status : false,
                _message : ' no record found !',
                _data : []
            }
            response.send(data)



        }
    });

server.listen(5000, ()=>{
    console.log('server is working fine');

});