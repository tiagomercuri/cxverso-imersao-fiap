// realizar um comportamento assíncrono, dizendo que não fica parado esperendo
console.log("1-Iniciando promessa");
// função que não entrega imediata, ela entrega uma promessa quando
//cumprida será uma string
const promessa = new Promise((resolve) => {
    setTimeout(() => {
        console.log("3-Já iniciei há um tempinho"); //executado depois de 2s
        resolve("Dados Carregados"); //quando a promessa é realizada
    }, 2000);
});
// como a promessa foi resovida chama que estava guardada e mostra o resultado
promessa.then((res) => console.log("4-Resultado Final", res));
console.log("2-Processo rodando abaixo da promessa"); //executa imediatamente
const contaIdade = (idade) => {
    return new Promise((res, rej) => {
        idade >= 18 ? res("Abre conta") : rej("não abre conta");
    });
};
contaIdade(19)
    .then((res) => console.log(res))
    .catch(erro => console.error(erro));
contaIdade(15)
    .then((res) => console.log(res))
    .catch(erro => console.error(erro));
export {};
