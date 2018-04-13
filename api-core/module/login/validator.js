//validations routes for login
module.exports = {
    '/login': {
        post: {
            query: null,
            body: {
                email: {
                    type: "string",
                    require: true
                },
                password: {
                    type: "string",
                    require: true
                }
            }
        }
    },

};