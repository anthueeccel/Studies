import { Imprimivel } from "../models/Imprimivel";

export function imprimir(...objetos: Imprimivel[]) {

    objetos.forEach(objeto => objeto.paraTexto());
}