//Objeto(interfaces)

interface Produto {
  readonly id: number;
  nome: string;
  preco: number;
}
// Carrinho
interface Carrinho {
  // Função que o adicionar recebe um objeto produto que não retorna nada
  adicionar: (produto: Produto) => void;
  // Função: Remover que precisa de um ID (number) e não retorna nada
  remover: (id: number) => void;
  // Array: retorna uma lista de objetos do tipo produto
  obterItens: () => Produto[];
  // Callback
  /*
      1- o metodo finalizarPedido não retorna valor deretamente, ele vai receber um função(ação) como argumento
      2- ação será executada posrteriormente, recebendo o total (number) e os itens (array de produtos)
    */
  finalizarPedido: (acao: (total: number, itens: Produto[]) => void) => void;
}

//Closure
function addCarrinho(): Carrinho {
  let itens: Produto[] = []; //Variável que ficará na memória do closure

  const sincronizar =()=> {
    const tela = document.getElementById('carrinho');
    if(!tela) return;

    if(itens.length === 0){
        tela.innerHTML = '<h3>Carrinho vazio</h3>';
        return;
    }

    const total = itens.reduce((soma, item)=> soma + item.preco, 0);

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
    adicionar: (produto:Produto):void => {
        itens=[...itens, {...produto, id:Date.now() + Math.random()}];
        sincronizar();
    },
    remover: (id:number):void => {
        itens = itens.filter(item =>item.id !== id)
        sincronizar();
    },
    obterItens: ():Produto[] => [...itens],

    finalizarPedido: (acao):void => {
        const total = itens.reduce((soma, item)=> soma + item.preco, 0);
        acao(total, [...itens]) //execução do callback enviado as informações processadas
    }
  }
}

// inicializada a instancia (uso do closure)
const meuCarrinho = addCarrinho();

//Eventos

const botoes = document.querySelectorAll('.btn-comprar');

botoes.forEach(botao => {
    botao.addEventListener('click', (e)=> {
        const elemento = e.currentTarget as HTMLBRElement;

        const id = Number(elemento.getAttribute('data-id'));
        const nome = elemento.getAttribute('data-nome') || '';
        const preco = Number(elemento.getAttribute('data-preco'));

        meuCarrinho.adicionar({id, nome, preco});
    })
});

//Exposição Global
(window as any).addCarrinho = function(id:number, nome:string, preco:number){
    meuCarrinho.adicionar({id, nome, preco});
};

(window as any).removerDoCarrinho = function(id:number){
    meuCarrinho.remover(id);
}