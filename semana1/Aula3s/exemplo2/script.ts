// realizar um comportamento assíncrono, dizendo que não fica parado esperendo

console.log("1-Iniciando promessa");

// função que não entrega imediata, ela entrega uma promessa quando
//cumprida será uma string
const promessa = new Promise<string>((resolve) => {
  setTimeout(() => {    //função que dispara um time
    console.log("3-Já iniciei há um tempinho"); //executado depois de 2s
    resolve("Dados Carregados");    //quando a promessa é realizada
  }, 2000);
});
// como a promessa foi resovida chama que estava guardada e mostra o resultado
promessa.then((res) => console.log("4-Resultado Final", res));

console.log("2-Processo rodando abaixo da promessa"); //executa imediatamente

//Função que não entrega resposta imediata, a função recebe um número como entrada
//ela entrega uma promessa que se for cumprida será string
const contaIdade=(idade:number):Promise<string>=>{
    //construtor da promessa
    //res-(resolve) - puxa o gatilho se a operação for um sucesso 
    //rej-(reject) - puxa o gatilho se algo der errado ou não atender os requisitos
    return new Promise((res, rej)=>{
        //logica usando um operador ternário
        idade >= 18 ? res("Abre conta") : rej("não abre conta");
    })
}

//executando a função
contaIdade(19)
//lida com o valor que você passou no res(resolve)
.then((res)=>console.log(res))
//lida com o valor ou erro que você passou no rej(reject)
.catch(erro=>console.error(erro));

contaIdade(15)
.then((res)=>console.log(res))
.catch(erro=>console.error(erro));