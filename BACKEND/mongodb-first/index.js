const express = require('express');
const Database = require('./dbconfig.js');
const mongodb = require('mongodb');
const server = express();
// // parse requests of content-type - application/json
server.use(express.json());

// // parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

server.get('/', (request, response) => {
  response.send('Hello World!');
});

server.get('/api/product/add', async (request, response) => {
  try {
    // Connect to database
    const db = await Database(); 
    const collection = db.collection('products');

    const data = {
      name: request.query.name,
      image: request.query.image,
    };

    const result = await collection.insertOne(data);

    const output = {
      _status: true,
      _message: "Record inserted successfully",
      _data: result
    };
    response.send(output);

  } catch (error) {
    console.error(error);
    const output = {
      _status: false,
      _message: "Something went wrong",
      _data: null
    };
    response.send(output);
  }
});

server.get('/api/product/view', async (request, response) => {
    const db = await Database(); 
    db.collection('products').find().toArray()
    .then((result) => {
        if (result.length > 0) {
                const output = {
                _status: true,
                _message: "Record inserted successfully",
                _data: result
                };
                response.send(output);
        } else {
                    const output = {
                        _status: false,
                        _message: "Something went wrong",
                        _data: []
                     };
        response.send(output);
        }

  })
   .catch (()=> {
    const output = {
      _status: false,
      _message: "Something went wrong",
      _data: []
    };
    response.send(output);
    });
});

server.get('/api/product/detail/:name', async (request, response) => {
    const db = await Database(); 
    db.collection('products').findOne({
        name: request.params.name
    })
    .then((result) => {
        if (result !== '') {
                const output = {
                _status: true,
                _message: "Record inserted successfully",
                _data: result
                };
                response.send(output);
        } else {
                    const output = {
                        _status: false,
                        _message: "Something went wrong",
                        _data: null
                     };
        response.send(output);
        }

  })
   .catch (()=> {
    const output = {
      _status: false,
      _message: "Something went wrong",
      _data: null
    };
    response.send(output);
    });
});

server.get('/api/product/update/:id', async (request, response) => {
  try {
    // Connect to database
    const db = await Database(); 
    const collection = db.collection('products');

    const data = {
      name: request.query.name,
      image: request.query.image,
    };
    const id = new mongodb.ObjectId(request.params.id);

    const result = await collection.updateOne({_id : id }, { $set: data  });

    const output = {
      _status: true,
      _message: "Record updated successfully",
      _data: result
    };
    response.send(output);

  } catch (error) {
    console.error(error);
    const output = {
      _status: false,
      _message: "Something went wrong",
      _data: null
    };
    response.send(output);
  }
});

server.get('/api/product/delete/:id', async (request, response) => {
    const db = await Database(); 
    db.collection('products').deleteOne({
        _id: new mongodb.ObjectId(request.params.id)
    })
    .then((result) => {
        if (result.deletedCount != 0) {
                const output = {
                _status: true,
                _message: "Record delete successfully",
                _data: result
                };
                response.send(output);
        } else {
                    const output = {
                        _status: false,
                        _message: "Something went wrong",
                        _data: null
                     };
        response.send(output);
        }

  })
   .catch (()=> {
    const output = {
      _status: false,
      _message: "Something went wrong",
      _data: null
    };
    response.send(output);
    });
});

server.post('/api/color/add', async (request, response) => {

    const data = {
      name: request.query.name,
  
    };
    const db = await Database(); 
     db.collection('colors').insertOne(data);
    then((result) => {
        const output = {
            _status : true,
            _message : 'Record created succussfully', 
            _data : result
        }

        response.send(output);
    })
    .catch(() => {
        const output = {
            _status : false,
            _message : 'Something went wrong',
            _data : null
        }

        response.send(output);
    })
});

server.delete('/api/colors/delete/:id', async (request, response) => {
    const db = await Database(); 
    db.collection('colors').deleteOne({
        _id: new mongodb.ObjectId(request.params.id)
    })
    .then((result) => {
        if (result.deletedCount != 0) {
                const output = {
                _status: true,
                _message: "Record delete successfully",
                _data: result
                };
                response.send(output);
        } else {
                    const output = {
                        _status: false,
                        _message: "Something went wrong",
                        _data: null
                     };
        response.send(output);
        }

  })
   .catch (()=> {
    const output = {
      _status: false,
      _message: "Something went wrong",
      _data: null
    };
    response.send(output);
    });
});







server.listen(4000, () => {
  console.log('Server is working fine');
});
