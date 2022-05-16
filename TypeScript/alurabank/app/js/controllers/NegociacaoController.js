System.register(["../views/index", "../models/index", "../helpers/decorators/index", "../services/index", "../helpers/index"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var index_1, index_2, index_3, index_4, index_5, NegociacaoController, DiaDaSemana;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (index_3_1) {
                index_3 = index_3_1;
            },
            function (index_4_1) {
                index_4 = index_4_1;
            },
            function (index_5_1) {
                index_5 = index_5_1;
            }
        ],
        execute: function () {
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this._negociacoes = new index_2.Negociacoes();
                    this._negociacoesView = new index_1.NegociacoesView('#negociacoesView');
                    this._mensagemView = new index_1.MensagemView('#mensagemView');
                    this._negociacaoService = new index_4.NegociacaoService();
                    this._negociacoesView.update(this._negociacoes);
                }
                adicionar() {
                    let data = new Date(this._inputData.val().replace(/-/g, ','));
                    if (this.isDiaUtil(data)) {
                        this._mensagemView.update('Somente dia negociações em dias úteis');
                        return;
                    }
                    const negociacao = new index_2.Negociacao(data, parseInt(this._inputQuantidade.val()), parseFloat(this._inputValor.val()));
                    negociacao.paraTexto();
                    if (!this._negociacoes.paraArray().some(begociacaoRegistrada => negociacao.ehIgual(begociacaoRegistrada))) {
                        this._negociacoes.adicionar(negociacao);
                        this._mensagemView.update('Negociação adicionada com sucesso!');
                    }
                    else {
                        this._mensagemView.update('Registro duplicado');
                    }
                    index_5.imprimir(negociacao, this._negociacoes);
                    this._negociacoesView.update(this._negociacoes);
                }
                ;
                isDiaUtil(data) {
                    return data.getDay() == DiaDaSemana.Sabado || data.getDay() == DiaDaSemana.Domingo;
                }
                importaDados() {
                    this._negociacaoService
                        .obterNegociacoes(response => {
                        if (response.ok) {
                            return response;
                        }
                        else {
                            throw new Error(response.statusText);
                        }
                    })
                        .then(negociacoesParaImportar => {
                        const negociacoesImportadas = this._negociacoes.paraArray();
                        negociacoesParaImportar
                            .filter(negociacao => !negociacoesImportadas.some(jaImportada => negociacao.ehIgual(jaImportada)))
                            .forEach((negociacao) => this._negociacoes.adicionar(negociacao));
                        this._negociacoesView.update(this._negociacoes);
                       
                    })
                        .catch(err => {
                        this._mensagemView.update('Não foi possível importar');
                        console.log(err);
                    });
                }
            };
            __decorate([
                index_3.domInject('#data')
            ], NegociacaoController.prototype, "_inputData", void 0);
            __decorate([
                index_3.domInject('#quantidade')
            ], NegociacaoController.prototype, "_inputQuantidade", void 0);
            __decorate([
                index_3.domInject('#valor')
            ], NegociacaoController.prototype, "_inputValor", void 0);
            __decorate([
                index_3.throttle()
            ], NegociacaoController.prototype, "adicionar", null);
            __decorate([
                index_3.throttle()
            ], NegociacaoController.prototype, "importaDados", null);
            exports_1("NegociacaoController", NegociacaoController);
            (function (DiaDaSemana) {
                DiaDaSemana[DiaDaSemana["Domingo"] = 0] = "Domingo";
                DiaDaSemana[DiaDaSemana["Segunda"] = 1] = "Segunda";
                DiaDaSemana[DiaDaSemana["Terca"] = 2] = "Terca";
                DiaDaSemana[DiaDaSemana["Quarta"] = 3] = "Quarta";
                DiaDaSemana[DiaDaSemana["Quinta"] = 4] = "Quinta";
                DiaDaSemana[DiaDaSemana["Sexta"] = 5] = "Sexta";
                DiaDaSemana[DiaDaSemana["Sabado"] = 6] = "Sabado";
            })(DiaDaSemana || (DiaDaSemana = {}));
        }
    };
});
