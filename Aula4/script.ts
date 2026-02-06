//Abstração: classe que não pode ser instanciada, só pode ser herdada
abstract class Pagamento {
    //Encapsulamento: protegendo o atributo valor
    //ele só pode ser acessado pelas suas classes filhas
    protected valor: number; 

    //Construtor que é o método chamado no momento em que criamos o objeto
    //e serve para inicializar os atributos da classe com seus valores
    constructor(valordigitado: number) {
        this.valor = valordigitado;
    }
    //Método abstrato, vai obrigar as classes filhas a explicarem como processam o pagamento
    abstract acesso(): void;

    //método comum todas as filhas vão herdar toda lógica pronta
    exibirRecibo(): void {
        console.log(`Recibo gerado no valor de R$ ${this.valor.toFixed(2)}`);
    }


}

// Herança
class PagamentoCartao extends Pagamento {
    
    // modificadores de acesso: (public, private, protected)
    private numeroCartao: number; // Encapsulamento
    
    constructor(valor:number, numeroCartao: number) {
        super(valor); // Acessando o construtor da classe pai (Pagamento)
        this.numeroCartao = numeroCartao; //atributo da classe PagamentoCartao
    }

    //Polimorfismo

    acesso(): void {
        console.log(`Validando o Cartão ${this.numeroCartao}`);
    }
}

const compras: Pagamento[] = [
    new PagamentoCartao(500.00, 123456789)
]

compras.forEach(pagamento => {
    pagamento.acesso();
    pagamento.exibirRecibo();
    console.log('...');
})

class PagamentoPix extends Pagamento {
    private chavePix: string; 
    
    constructor(valor:number, chavePix: string) {
        super(valor); 
        this.chavePix = chavePix;
    }

    acesso(): void {
        console.log(`Validando a chave Pix ${this.chavePix}`);
    }
}

const comprasNovas: Pagamento[] = [
    new PagamentoPix(300.00, "987654321")
]

comprasNovas.forEach(pagamento => {
    pagamento.acesso();
    pagamento.exibirRecibo();
    console.log('...');
})