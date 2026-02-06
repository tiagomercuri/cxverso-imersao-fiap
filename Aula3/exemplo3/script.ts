// try/catch  - forma mais legivel de lidar com operações assincronicas
 
async function buscarDados(){
    try{
        const resposta = await fetch("https://dummyjson.com/quotes");
        const dados = await resposta.json()
        console.table(dados)
        console.log("Busca correta")
    
    } catch(erro){
        console.error("Erro ao solicitar a requisição",erro)
    }
   
}
buscarDados();


console.log("dados carregados")

/*criar um projeto que mostre os dados da api(com tratamento de erros e async/await ) 
no html usando DOM */