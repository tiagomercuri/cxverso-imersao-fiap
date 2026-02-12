//Objeto(interfaces)
//Closure
function addCarrinho() {
    let itens = []; //Variável que ficará na memória do closure
    const sincronizar = () => {
        const tela = document.getElementById('carrinho');
        if (!tela)
            return;
        if (itens.length === 0) {
            tela.innerHTML = '<h3>Carrinho vazio</h3>';
            return;
        }
        const total = itens.reduce((soma, item) => soma + item.preco, 0);
        tela.innerHTML = `
        <h3>Resumo do Pedido</h3>
        <ul>
            ${itens.map(item => `
                <li>
                    ${item.nome} - ${item.preco}
                    <button class="btn-remover" onclick="removerDoCarrinho(${item.id})">X</button>
                </li>
                `).join('')}
        </ul>
        <hr>
        <p><strong>Total: R$${total.toFixed(2)}</strong></p>
    `;
    };
    return {
        adicionar: (produto) => {
            itens = [...itens, { ...produto, id: Date.now() + Math.random() }];
            sincronizar();
        },
        remover: (id) => {
            itens = itens.filter(item => item.id !== id);
            sincronizar();
        },
        obterItens: () => [...itens],
        finalizarPedido: (acao) => {
            const total = itens.reduce((soma, item) => soma + item.preco, 0);
            acao(total, [...itens]); //execução do callback enviado as informações processadas
        }
    };
}
// inicializada a instancia (uso do closure)
const meuCarrinho = addCarrinho();
//Eventos
const botoes = document.querySelectorAll('.btn-comprar');
botoes.forEach(botao => {
    botao.addEventListener('click', (e) => {
        const elemento = e.currentTarget;
        const id = Number(elemento.getAttribute('data-id'));
        const nome = elemento.getAttribute('data-nome') || '';
        const preco = Number(elemento.getAttribute('data-preco'));
        meuCarrinho.adicionar({ id, nome, preco });
    });
});
//Exposição Global
window.addCarrinho = function (id, nome, preco) {
    meuCarrinho.adicionar({ id, nome, preco });
};
window.removerDoCarrinho = function (id) {
    meuCarrinho.remover(id);
};
export {};
