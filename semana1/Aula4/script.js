//Abstração: classe que não pode ser instanciada, só pode ser herdada
class Pagamento {
    //Encapsulamento: protegendo o atributo valor
    //ele só pode ser acessado pelas suas classes filhas
    valor;
    //Construtor que é o método chamado no momento em que criamos o objeto
    //e serve para inicializar os atributos da classe com seus valores
    constructor(valordigitado) {
        this.valor = valordigitado;
    }
    //método comum todas as filhas vão herdar toda lógica pronta
    exibirRecibo() {
        console.log(`Recibo gerado no valor de R$ ${this.valor.toFixed(2)}`);
    }
}
// Herança
class PagamentoCartao extends Pagamento {
    // modificadores de acesso: (public, private, protected)
    numeroCartao; // Encapsulamento
    constructor(valor, numeroCartao) {
        super(valor); // Acessando o construtor da classe pai (Pagamento)
        this.numeroCartao = numeroCartao; //atributo da classe PagamentoCartao
    }
    //Polimorfismo
    acesso() {
        console.log(`Validando o Cartão ${this.numeroCartao}`);
    }
}
const compras = [
    new PagamentoCartao(500.00, 123456789)
];
compras.forEach(pagamento => {
    pagamento.acesso();
    pagamento.exibirRecibo();
    console.log('...');
});
class PagamentoPix extends Pagamento {
    chavePix;
    constructor(valor, chavePix) {
        super(valor);
        this.chavePix = chavePix;
    }
    acesso() {
        console.log(`Validando a chave Pix ${this.chavePix}`);
    }
}
const comprasNovas = [
    new PagamentoPix(300.00, "987654321")
];
comprasNovas.forEach(pagamento => {
    pagamento.acesso();
    pagamento.exibirRecibo();
    console.log('...');
});
export {};
