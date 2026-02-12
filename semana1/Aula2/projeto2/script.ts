// 1. Interfaces (Contratos)
interface Produto {
    readonly id: number;
    nome: string;
    preco: number;
}

interface Carrinho {
    adicionar: (produto: Produto) => void;
    remover: (id: number) => void;
    obterItens: () => Produto[];
    finalizarPedido: (acao: (total: number, itens: Produto[]) => void) => void;
}

// 2. Closure (Fábrica de Carrinho)
function criarLojaDoces(): Carrinho {
    // Estado privado (encapsulado pelo closure)
    let itens: Produto[] = []; 

    // Função interna para atualizar o HTML (DOM)
    const renderizar = () => {
        const tela = document.getElementById('carrinho');
        if (!tela) return;

        if (itens.length === 0) {
            tela.innerHTML = '<h3>Seu Carrinho está vazio 🛒</h3>';
            return;
        }

        const total = itens.reduce((soma, item) => soma + item.preco, 0);

        tela.innerHTML = `
            <h3>🍬 Resumo do Pedido</h3>
            <ul>
                ${itens.map(item => `
                    <li>
                        <span>${item.nome}</span>
                        <span>
                            R$ ${item.preco.toFixed(2)}
                            <button class="btn-remover" onclick="removerDoCarrinho(${item.id})">X</button>
                        </span>
                    </li>
                `).join('')}
            </ul>
            <hr>
            <p style="font-size: 1.2rem;"><strong>Total a pagar: R$ ${total.toFixed(2)}</strong></p>
        `;
    };

    // Retorno da Interface Pública (apenas estes métodos são acessíveis)
    return {
        adicionar: (produto: Produto): void => {
            // Cria um ID único temporal para permitir adicionar o mesmo doce várias vezes
            itens = [...itens, { ...produto, id: Date.now() + Math.random() }];
            renderizar();
        },
        remover: (id: number): void => {
            itens = itens.filter(item => item.id !== id);
            renderizar();
        },
        obterItens: (): Produto[] => [...itens], // Retorna uma cópia para proteger o original
        
        finalizarPedido: (callback): void => {
            const total = itens.reduce((soma, item) => soma + item.preco, 0);
            callback(total, [...itens]);
        }
    };
}

// 3. Inicialização
const minhaDoceria = criarLojaDoces();

// 4. Captura de Eventos (DOM)
const botoes = document.querySelectorAll('.btn-comprar');

botoes.forEach(botao => {
    botao.addEventListener('click', (e) => {
        // Correção de tipagem para HTMLButtonElement
        const elemento = e.currentTarget as HTMLButtonElement;

        const id = Number(elemento.getAttribute('data-id'));
        const nome = elemento.getAttribute('data-nome') || '';
        const preco = Number(elemento.getAttribute('data-preco'));

        minhaDoceria.adicionar({ id, nome, preco });
    });
});

// 5. Exposição Global para o HTML (Necessário para o onclick="removerDoCarrinho" funcionar)
(window as any).removerDoCarrinho = function(id: number) {
    minhaDoceria.remover(id);
};