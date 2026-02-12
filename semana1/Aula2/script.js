let nome = "Fiap";
let idade = 30;
let programador = true;
console.log(nome);
// função com operadores
function calcular(preco, quantidade) {
    const total = preco * quantidade;
    return total;
}
function contador() {
    let contagem = 0; // variavel está protegida dentro da função
    return {
        incrementar: () => {
            contagem++;
            return contagem;
        },
    };
}
const resultContador = contador();
console.log(resultContador.incrementar());
console.log(resultContador.incrementar());
// Call back function
// callback é uma função passada como argumtento para outra função
// função que recebe uma string e não retorna nada(void)
function usuario(nome, callback) {
    const mensagem = `Usuário ${nome} logado com sucesso!`;
    callback(mensagem); // executa a função enviada apos o processamento
}
usuario("Thor", (resultado) => {
    console.log(resultado);
});
const meuCarro = {
    marca: "Audi",
    ano: 2026,
    modelo: "Audi SX",
};
console.log(meuCarro);
const livro = {
    titulo: "JavaScript Avançado",
    paginas: 200,
    autor: "Wellington Silva",
    disponivel: true,
};
function emprestarLivro(nome, callback) {
    const mensagem = `Cliente ${nome} recebeu o livro ${livro.titulo} do autor ${livro.autor}`;
    callback(mensagem);
}
emprestarLivro("Tiago", (resultado) => {
    console.log(resultado);
});
export {};
