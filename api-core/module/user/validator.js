//validations routes for users
module.exports = {
    '/user/all': {
        get: {
            query: null,
            body: null
        }
    },
    '/user/id': {
        get: {
            query: {
                id: {
                    type: "string",
                    require: true
                }
            },
            body: null
        }
    },
    '/user': {

        get: {
            query: null,
            body: null
        },

        post: {
            query: null,
            body: {
                name: {
                    type: "string",
                    require: true
                },
                email: {
                    type: "string",
                    require: true
                },
                rol_id: {
                    type: "string",
                    require: false  
                },
                password: {
                    type: "string",
                    require: true
                },
                status_id: {
                    type: "string",
                    require: true
                },
                phone: {
                    type: "string",
                    require: false
                },
                address: {
                    type: "string",
                    require: false
                },
                city: {
                    type: "string",
                    require: false
                },
                company: {
                    type: "string",
                    require: false
                },
                dni: {
                    type: "string",
                    require: false
                },
                nickname: {
                    type: "string",
                    require: false
                },
                postalCode: {
                    type: "string",
                    require: false
                },
                state: {
                    type: "string",
                    require: false
                },
                surname: {
                    type: "string",
                    require: false
                },
                clientType_id: {
                    type: "number",
                    require: false
                },
                fiscal: {
                    type: "string",
                    require: false
                },
                cuil: {
                    type: "string",
                    require: false
                },
                payment: {
                    type: "string",
                    require: false
                },
                bank: {
                    type: "string",
                    require: false
                },
                bankcbu: {
                    type: "string",
                    require: false
                },
                banknum: {
                    type: "string",
                    require: false
                }
            }
        }
    },
    '/user/password': {
        put: {
            query: null,

            body: {
                oldPassword: {
                    type: "string",
                    require: true
                },
                newPassword: {
                    type: "string",
                    require: true
                }
            }
        }
    },
    '/user/status': {

        get: {
            query: null,
            body: null
        }
    },
    '/user/plugins': {
        post: {
            body: {
                plugins: {
                    type: "object",
                    require: true
                },
                userId: {
                    type: "number",
                    require: true
                }
            }
        }
    }
};