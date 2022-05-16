import { NegociacaoController } from './controllers/NegociacaoController';

const controller = new NegociacaoController();

$('.form').submit(controller.adicionar.bind(controller));
$('#botao-importa').click(controller.importaDados.bind(controller));
