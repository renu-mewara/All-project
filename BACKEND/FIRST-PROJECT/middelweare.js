module.exports =(request, response, next)=>{
     if(request.query.username== '' || request.query.password== ''){

            const data = {
                _status : true,
                _message : 'Required filled missing!',
                _data : []
            }
            response.send(data)

        }else if(request.query.username != 'user' || request.query.password != 'password'){
                 const data = {
                _status : false,
                _message : ' Username or password is incorrect !',
                _data : []
            }
              response.send(data)
        }
    next();
}