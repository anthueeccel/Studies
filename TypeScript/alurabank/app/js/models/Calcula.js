class Retangulo {
    constructor(altura, lado) {
        this.altura = altura;
        this.lado = lado;
    }
    calculaArea() {
        return this.altura * this.lado;
    }
}
class Quadrado {
    constructor(lado) {
        this.lado = lado;
    }
    calculaArea() {
        return this.lado * this.lado;
    }
}
class Circulo {
    constructor(raio) {
        this.raio = raio;
    }
    calculaArea() {
        return Math.PI * this.raio * this.raio;
    }
}
class CalculadorDeArea {
    static calcula(...areas) {
        return areas.reduce((a, b) => a + b.calculaArea(), 0);
    }
}
const quadrado = new Quadrado(30);
const retangulo = new Retangulo(50, 30);
const circulo = new Circulo(20);
const total = CalculadorDeArea.calcula(quadrado, retangulo, circulo);
console.log(total);
