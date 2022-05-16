System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function logTempoDeExecucao(emSegundos = false) {
        return function (target, propertyKey, descriptor) {
            const metodoOrigianl = descriptor.value;
            descriptor.value = function (...args) {
                let unidade = 'ms';
                let divisor = 1;
                if (emSegundos) {
                    unidade = 's';
                    divisor = 1000;
                }
                console.log('-----------------------');
                console.log(`Parâmetros ${propertyKey}: ${JSON.stringify(args)}`);
                const t1 = performance.now();
                const retorno = metodoOrigianl.apply(this, args);
                const t2 = performance.now();
                console.log(`Retorno do método ${propertyKey} é ${JSON.stringify(retorno)}`);
                console.log(`Método ${propertyKey} demorou ${(t2 - t1) / divisor} ${unidade}`);
                return retorno;
            };
            return descriptor;
        };
    }
    exports_1("logTempoDeExecucao", logTempoDeExecucao);
    return {
        setters: [],
        execute: function () {
        }
    };
});
