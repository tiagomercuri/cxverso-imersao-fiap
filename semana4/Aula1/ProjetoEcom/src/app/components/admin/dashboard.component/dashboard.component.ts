// Importa o decorador Component (para definir a classe como componente) e a função inject (para usar serviços).
import { Component, inject } from '@angular/core';

// Importa o serviço que gerencia o estado do carrinho de compras em toda a aplicação.
import { CarrinhoService } from '../../../core/services/carrinho.service';

// Importa o RouterModule (para links no HTML) e o Router (para navegação via código TypeScript).
import { RouterModule} from '@angular/router'; 

// Importa o pipe padrão do Angular para transformar números em formatos de moeda (ex R$).
import { CurrencyPipe } from '@angular/common';

@Component({
  // Declara quais recursos externos este componente usará no seu arquivo HTML.
  imports: [CurrencyPipe, RouterModule],
  
  // Define o caminho do arquivo que contém a estrutura visual (o desenho) deste componente.
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  /* Injetamos o CarrinhoService usando a função inject().
   * Isso permite que o Dashboard "escute" em tempo real as mudanças no carrinho 
   * (como total de itens e valor) que o cliente adiciona na tela.
   */
  public servicoCarrinho = inject(CarrinhoService);
}