// Importa as ferramentas de reatividade do Angular. O 'effect' é a novidade aqui para reagir a mudanças.
import { Injectable, signal, computed, effect } from '@angular/core';
import { Produto } from '../../models/produto';

/*Interface de Extensão:
 * Mostra  como reutilizar a interface 'Produto' adicionando um campo novo ('quantidade').
 */
export interface CarrinhoItem extends Produto {
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  /*SIGNAL PRIVADO:
   * O estado real do carrinho. Somente este serviço pode alterá-lo diretamente.
   * Começa tentando recuperar dados salvos no navegador.
   */
  private _itens = signal<CarrinhoItem[]>(this.carregarDoArmazenamento());

  /* SIGNAL READ-ONLY:
   * Expõe os dados para os componentes (como a Navbar ou o Dashboard) lerem, 
   * mas protege contra alterações acidentais vindas de fora.
   */
  itens = this._itens.asReadonly();

  /* COMPUTED: Reatividade Automática.
   * Sempre que '_itens' mudar, estes valores são recalculados sozinhos.
   * Perfeito para mostrar o contador de itens no ícone do carrinho.
   */
  totalItens = computed(() => 
    this._itens().reduce((acc, item) => acc + item.quantidade, 0)
  );

  precoTotal = computed(() => 
    this._itens().reduce((acc, item) => acc + (item.preco * item.quantidade), 0)
  );

  constructor() {
    /* EFFECT: O "Observador" Silencioso.
     * Sempre que o sinal '_itens' mudar, esta função roda automaticamente.
     * É a forma moderna de sincronizar dados com o LocalStorage.
     */
    effect(() => {
      localStorage.setItem('dados_carrinho', JSON.stringify(this._itens()));
    });
  }

  /*
   * Adiciona um produto ao carrinho com lógica de imutabilidade.
   */
  adicionarAoCarrinho(produto: Produto) {
    const itensAtuais = this._itens();
    const itemExistente = itensAtuais.find(i => i.id === produto.id);

    if (itemExistente) {
      /*ATUALIZAÇÃO IMUTÁVEL: 
       * Em vez de mudar o objeto, criamos uma lista nova com o item alterado.
       * Isso garante que o Angular detecte a mudança instantaneamente.
       */
      this._itens.update(lista => 
        lista.map(i => i.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i)
      );
    } else {
      // Adiciona um novo item à lista usando o operador spread (...)
      this._itens.update(lista => [...lista, { ...produto, quantidade: 1 }]);
    }
  }

  // Remove um item completamente da lista baseada no ID.
  removerDoCarrinho(produtoId: string | number) {
    this._itens.update(lista => lista.filter(i => i.id !== produtoId));
  }

  // Reseta o carrinho para uma lista vazia.
  limparCarrinho() {
    this._itens.set([]);
  }

  // Busca os dados persistidos para que o carrinho não esvazie ao atualizar a página.
  private carregarDoArmazenamento(): CarrinhoItem[] {
    const dados = localStorage.getItem('dados_carrinho');
    return dados ? JSON.parse(dados) : [];
  }
}