async function buscarDados() {
    try {
        const resposta = await fetch("https://dummyjson.com/quot");
        const dados = await resposta.json();
        console.table(dados);
        console.log("Busca correta");
    }
    catch (erro) {
        console.error("Erro ao solicitar a requisição", erro);
    }
}
buscarDados();
console.log("dados carregados");
export {};
