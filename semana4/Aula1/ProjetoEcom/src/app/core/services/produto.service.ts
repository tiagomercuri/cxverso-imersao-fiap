// Importa o núcleo do Angular. O 'effect' é o vigia que salva dados automaticamente.
import { Injectable, inject, signal, effect } from '@angular/core'; 
// Importa o cliente para fazer requisições a arquivos ou APIs.
import { HttpClient } from '@angular/common/http';
// Importa ferramentas do RxJS para transformar a lista de produtos que vem do arquivo.
import { Observable, map } from 'rxjs';
import { Produto } from '../../models/produto';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private http = inject(HttpClient);
  private urlJson = 'produto.json'; // Caminho para o arquivo na pasta public.
  
  /* SIGNAL DE PERSISTÊNCIA:
   * Este sinal guarda apenas os produtos que o usuário cadastrou pelo Admin.
   * Ele é a nossa "memória RAM" para novos itens.
   */
  private produtosAdicionados = signal<Produto[]>([]);

  constructor() {
    /* RECUPERAÇÃO DE DADOS:
     * Ao carregar a página, verificamos se o navegador tem produtos salvos no "HD" (LocalStorage).
     * Se tiver, alimentamos nosso Signal imediatamente.
     */
    const salvos = localStorage.getItem('produtos_locais');
    if (salvos) {
      this.produtosAdicionados.set(JSON.parse(salvos)); 
    }

    /* O EFEITO AUTOMÁTICO:
     * Sempre que o Signal 'produtosAdicionados' mudar (adicionar/remover), 
     * este código roda sozinho e atualiza o LocalStorage.
     */
    effect(() => {
      localStorage.setItem('produtos_locais', JSON.stringify(this.produtosAdicionados()));
    });
  }

  /*
   * Adiciona um novo produto à lista existente de forma imutável.
   * O uso do spread operator ([...lista, novo]) garante a reatividade.
   */
  adicionarProduto(novo: Produto) {
    this.produtosAdicionados.update(lista => [...lista, novo]);
  }

  /* A UNIÃO DOS MUNDOS (Merge):
   * Este método busca os produtos "de fábrica" do JSON e junta com os
   * produtos "criados pelo usuário" que estão no Signal.
   */
  obterProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.urlJson).pipe(
      map(doJson => {
        // Retorna uma única lista contendo TUDO o que o app conhece.
        return [...doJson, ...this.produtosAdicionados()];
      })
    );
  }

  /*
   * Busca um produto específico. Como a lista pode ser grande, usamos o pipe e o find.
   * Convertemos o ID para String para evitar erros de comparação (1 vs "1").
   */
  obterProdutoPorId(id: string): Observable<Produto | undefined> {
    return this.obterProdutos().pipe(
      map(produtos => produtos.find(p => String(p.id) === String(id)))
    );
  }
}