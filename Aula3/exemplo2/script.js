// realizar um comportamento assíncrono, dizendo que não fica parado esperando
console.log("1-Iniciando promessa"); //executa imediatamente
// função que não entrega uma resposta imediata , ela entra uma promessa quando
//cumprida será uma string
const promessa = new Promise((resolve) => {
    setTimeout(() => {
        console.log("3-Ja iniciei há um tempinho"); //executado depois de 2s
        resolve("Dados Carregados"); // quando a promessa é realizada
    }, 2000);
});
// como a promessa foi resolvida chama que estava guardada e mostra o resultado
promessa.then(res => console.log("4-Resultado Final", res));
console.log("2-Processo rodando  abaixo da promessa"); //executa imediatamente
const contaIdade = (idade) => {
    return new Promise((res, rej) => {
        idade >= 18 ? res("Abre conta") : rej("Não abre conta");
    });
};
contaIdade(19)
    .then(res => console.log(res))
    .catch(erro => console.error(erro));
contaIdade(15)
    .then(res => console.log(res))
    .catch(erro => console.error(erro));
export {};
