//validations routes for generic
module.exports = {
    '/config/': {
        get: {
            query: {
                id: {
                    type: "string",
                    require: true
                }
            },
            body: null
        },
        update: {
            query: {
                id: {
                    type: "string",
                    require: true
                }
            },
            body: {
                name: {
                    type: "string",
                    require: true
                }
            }
        }
    }
};
