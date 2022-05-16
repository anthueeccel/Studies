import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacoes, Negociacao } from '../models/index';
import { domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService, ResponseHandler } from '../services/index';
import { imprimir } from '../helpers/index';

export class NegociacaoController {


    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

    private _negociacaoService = new NegociacaoService();

    constructor() {
        this._negociacoesView.update(this._negociacoes);
    }

    @throttle()
    adicionar() {

        let data = new Date(this._inputData.val().replace(/-/g, ','));

        if (this.isDiaUtil(data)) {
            this._mensagemView.update('Somente dia negociações em dias úteis');
            return;
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        negociacao.paraTexto();

        if (!this._negociacoes.paraArray().some(begociacaoRegistrada => negociacao.ehIgual(begociacaoRegistrada))) {
            this._negociacoes.adicionar(negociacao);
            this._mensagemView.update('Negociação adicionada com sucesso!');
        } else {
            this._mensagemView.update('Registro duplicado');
        }


        imprimir(negociacao, this._negociacoes);

        /*depois de adicionar, atualiza a view novamente para refletir os dados*/
        this._negociacoesView.update(this._negociacoes);
    };

    private isDiaUtil(data: Date): boolean {
        return data.getDay() == DiaDaSemana.Sabado || data.getDay() == DiaDaSemana.Domingo;
    }

    @throttle()
    async importaDados() {

        const negociacoesParaImportar = await this._negociacaoService
            .obterNegociacoes(response => {
                if (response.ok) {
                    return response;
                } else {
                    throw new Error(response.statusText);
                }
            })

        const negociacoesImportadas = this._negociacoes.paraArray();

        negociacoesParaImportar
            .filter(negociacao => negociacoesImportadas
            .forEach((negociacao) => this._negociacoes.adicionar(negociacao));
        this._negociacoesView.update(this._negociacoes)
        this._mensagemView.update('Registros importados com sucesso');
    }
}

enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}
