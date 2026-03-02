// Importa o núcleo do Angular, incluindo o 'signal' para gerenciamento de estado moderno e 'OnInit' para o ciclo de vida.
import { Component, inject, signal, OnInit } from '@angular/core';

// Importa o CommonModule para diretivas básicas e RouterModule para permitir links de navegação no HTML.
import { CommonModule } from '@angular/common';

// Importa ferramentas de rota para capturar dados que o Resolver buscou antes da página carregar.
import { ActivatedRoute, RouterModule } from '@angular/router';

// Importa o serviço global de carrinho para permitir que o usuário compre o produto visualizado.
import { CarrinhoService } from '../../../core/services/carrinho.service';

// Importa a interface que define quais campos um produto deve ter (id, nome, preco, etc.).
import { Produto } from '../../../models/produto'; 

@Component({
  selector: 'app-detail',
  standalone: true, // Define que o componente gerencia suas próprias dependências de forma independente.
  imports: [CommonModule, RouterModule],
  templateUrl: './detalhes-produto.component.html'
})
export class DetalheComponent implements OnInit {
  // Injeta a rota ativa para acessar os dados resolvidos e o serviço de carrinho para ações de compra.
  private route = inject(ActivatedRoute);
  private servicoCarrinho = inject(CarrinhoService);

  /*
   * Signal: Cria um estado reativo que armazena o produto.
   * Ele começa como 'null' e será preenchido assim que o componente iniciar.
   */
  produto = signal<Produto | null>(null);

  /*
   * ngOnInit: Método executado assim que o componente nasce na tela.
   * É o momento ideal para buscar os dados que vieram das rotas.
   */
  ngOnInit() {
    // Captura o produto que o 'Resolver' buscou no serviço antes mesmo da página abrir.
    const produtoResolvido = this.route.snapshot.data['produto'];
    
    if (produtoResolvido) {
      // Alimenta o Signal com os dados do produto, notificando o HTML para se atualizar.
      this.produto.set(produtoResolvido);
    }
  }

  /*
   * Método disparado pelo clique no botão do HTML.
   * Adiciona o produto atual ao estado global do carrinho de compras.
   */
  adicionarAoCarrinho() {
    const p = this.produto(); // Extrai o valor atual do Signal.
    if (p) { 
      // Chama a lógica de negócio no serviço para atualizar o total e a lista do carrinho.
      this.servicoCarrinho.adicionarAoCarrinho(p);
      console.log('Produto adicionado ao carrinho:', p.nome);
    }
  }
}