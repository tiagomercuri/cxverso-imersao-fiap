// Importa o núcleo do Angular para criar componentes e realizar a Injeção de Dependência.
import { Component, inject } from '@angular/core';

// Importa o CommonModule, que permite usar diretivas básicas como *ngIf ou @if no HTML.
import { CommonModule } from '@angular/common';

// Importa ferramentas para Formulários Reativos: permite controle total sobre validações e dados de entrada.
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// Importa o serviço que gerencia a lista de produtos globalmente na aplicação.
import { ProdutoService } from '../../../core/services/produto.service';

// Importa o serviço de rotas para podermos navegar o usuário entre páginas via código.
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  // Registra os módulos necessários para que o formulário e as validações funcionem no HTML.
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './novo-produto.component.html'
})
export class ProdutoFormComponent {
  // Injeta o FormBuilder para facilitar a criação e configuração de grupos de campos.
  private fb = inject(FormBuilder);
  
  // Injeta o serviço de produtos para podermos salvar o novo item criado no formulário.
  private produtoService = inject(ProdutoService);
  
  // Injeta o roteador para levar o usuário de volta à tela após o cadastro.
  private router = inject(Router);

  /*
   * Define a estrutura do formulário e suas regras de validação (Validators).
   * Note que aqui os campos estão em português para facilitar o entendimento .
   */
  formularioProduto: FormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(5)]], // Campo obrigatório com mínimo de 5 letras.
    preco: [null, [Validators.required, Validators.min(0.01)]], // Deve ser um número maior que zero.
    descricao: ['', [Validators.required]],                    // Campo de texto obrigatório.
    imagem: ['', Validators.required]                          // Armazena o caminho da foto, como /img/banco.jpg.
  });

  /* Função utilitária para o HTML: verifica se o usuário interagiu com o campo e se ele está errado.
   * Ajuda a mostrar aquelas mensagens de erro vermelhas no momento certo.
   */
  campoInvalido(campo: string): boolean {
    const controle = this.formularioProduto.get(campo);
    return !!(controle && controle.invalid && (controle.dirty || controle.touched));
  }

  /*
   * Método executado ao clicar no botão "Salvar".
   * Ele transforma o formulário em um objeto e o envia para o estado global (Signal).
   */
  Enviar() {
    if (this.formularioProduto.valid) {
      // Cria um novo objeto combinando os dados digitados com um ID aleatório único.
      const novoItem = {
        ...this.formularioProduto.value,
        id: Math.floor(Math.random() * 1000) 
      };

      // Chama o método do serviço que adiciona o item ao Signal de produtos.
      this.produtoService.adicionarProduto(novoItem);
      
      console.log('Produto cadastrado com sucesso:', novoItem);
      
      // Redireciona o administrador para a tela para conferir o resultado instantaneamente.
      this.router.navigate(['/produtos']);
    }
  }
}