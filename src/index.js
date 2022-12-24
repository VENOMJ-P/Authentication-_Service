const express = require('express');
const bodyParser = require('body-parser');


const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const UserService = require('./services/user-service');
const app = express();


const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);
    app.listen(PORT, async () =>{
        console.log(`Server started ${PORT}`);
        const service = new UserService();
        // const newToken = service.createToken({email:'sanket@admin.com', id:1})
        // console.log('New Token is :',newToken);
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbmtldEBhZG1pbi5jb20iLCJpZCI6MSwiaWF0IjoxNjcxODUyNjgyLCJleHAiOjE2NzE4NTYyODJ9.WhzxMUZDE9mLq2uJPZevXjYlzuXIT1n3Mqm0HWxTEwc'
        const response = service.verifyToken(token);
        console.log(response);
    })

}

prepareAndStartServer();