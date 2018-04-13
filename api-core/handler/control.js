// Errors
// 400 Solicitud incorrecta
// 401 permisos  no permitido
// 404 Archivo   no encontrado
// 500 Servidor  Error interno
// 503	Sevicio   no disponible
"use strict";
var controlStatus = require('../handlers/config.json');

module.exports = function(type, ob) {
    if (controlStatus[type] && ob.status) {
    	ob.status = false;
        ob.res.status(controlStatus[type].status);
        ob.res.sender(controlStatus[type]);
    }
};
