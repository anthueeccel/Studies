System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function imprimir(...objetos) {
        objetos.forEach(objeto => objeto.paraTexto());
    }
    exports_1("imprimir", imprimir);
    return {
        setters: [],
        execute: function () {
        }
    };
});
