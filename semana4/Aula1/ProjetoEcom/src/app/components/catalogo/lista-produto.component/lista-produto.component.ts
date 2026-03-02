// Importa o núcleo do Angular para criar o componente e injetar dependências.
import { Component, inject } from '@angular/core';

// Importa Pipes essenciais: AsyncPipe (para gerenciar dados do tipo Observable) e CurrencyPipe (para formatar dinheiro).
import { AsyncPipe, CurrencyPipe } from '@angular/common';

// Importa o módulo de rotas para que os links de "Ver Detalhes" funcionem no HTML.
import { RouterModule } from '@angular/router';

// Importa o Observable do RxJS, que representa um "fluxo de dados" que chegará do arquivo JSON.
import { Observable } from 'rxjs';

// Importa o serviço que faz a ponte com os dados e a interface que define o que é um Produto.
import { ProdutoService } from '../../../core/services/produto.service';
import { Produto } from '../../../models/produto'; 

@Component({
  selector: 'app-produto-lista', 
  standalone: true, // Componente autossuficiente, padrão moderno do Angular.
  
  // Registra as ferramentas que o HTML vai usar. Sem o AsyncPipe, o Angular não saberia ler o Observable.
  imports: [AsyncPipe, CurrencyPipe, RouterModule],
  
  templateUrl: './lista-produto.component.html'
})
export class ProdutoListaComponent {
  /* Injeção de Dependência: Estamos trazendo o ProdutoService para dentro do componente.
   * É ele quem sabe como buscar os dados no arquivo 'produto.json'.
   */
  private servicoProduto = inject(ProdutoService);
  
  /*O sinal '$' no final do nome é uma convenção para indicar que esta variável é um Observable.
   * Ela não guarda os produtos diretamente, mas sim uma "promessa" de que os produtos chegarão.
   * Usamos a interface Produto[] para garantir que teremos uma lista válida.
   */
  produtos$: Observable<Produto[]> = this.servicoProduto.obterProdutos();
}