/*
*Validations for routes
*
*/
module.exports = {

    //Login
    '/login': {
        'method': ['POST'],
        'exclude': true
    },
    '/token': {
        'method': ['GET','DELETE'],
        'bearer': true
    },
    //User 
    '/user': {
        'method': ['GET', 'POST', 'PUT'],
        'bearer': true
    },
    '/user/password': {
        'method': ['PUT'],
        'bearer': true
    },
    '/user/id': {
        'method': ['GET','PUT'],
        'bearer': true
    },
    '/user/all': {
        'method': ['GET'],
        'bearer': true
    },
    '/user/plugins':{
        'method': ['POST','DELETE'],
        'bearer': true
    },
    //alerts
    '/config':{
        'method':['GET', 'POST', 'PUT', 'DELETE'],
        'bearer': true
    },
};