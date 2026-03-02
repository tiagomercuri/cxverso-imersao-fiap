// Importa o núcleo do Angular para transformar a classe em um Componente e usar Injeção de Dependência.
import { Component, inject } from '@angular/core';

// Importa o módulo necessário para que o Angular entenda diretivas de formulário como [formGroup] e formControlName.
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

// Importa o serviço de produtos para podermos registrar o novo item na lista global (Signal).
import { ProdutoService } from '../../../core/services/produto.service';

// Importa o serviço de rotas para redirecionar o usuário após o sucesso do cadastro.
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto-form',
  standalone: true, // Indica que o componente é independente e gerencia suas próprias dependências.
  imports: [ReactiveFormsModule], // Habilita o uso de formulários reativos dentro do arquivo HTML deste componente.
  templateUrl: './produto.component.html'
})
export class ProdutoFormComponent {
  // Injeta as ferramentas de construção de formulário, o serviço de dados e o roteador.
  private form = inject(FormBuilder);
  private servicoProduto = inject(ProdutoService);
  private router = inject(Router);

  /*
   * Define a estrutura de dados do formulário com validações:
   * - nome: Obrigatório e mínimo de 5 caracteres.
   * - preco: Obrigatório e valor mínimo de 0.01 (não pode ser grátis).
   * - descricao: Obrigatória para informar o cliente.
   * - imagem: Já inicia com um caminho padrão para evitar erros visuais.
   */
  formularioProduto = this.form.group({
    nome: ['', [Validators.required, Validators.minLength(5)]],
    preco: [0, [Validators.required, Validators.min(0.01)]],
    descricao: ['', [Validators.required]],
    imagem: ['', [Validators.required]]
  });

  /*
   * Método disparado pelo evento (ngSubmit) do formulário.
   * Realiza a transformação dos dados da tela em um objeto reconhecido pelo sistema.
   */
  salvar() {
    // Só executa a lógica se todas as regras do Validators forem atendidas.
    if (this.formularioProduto.valid) {
      
      // Cria um novo objeto combinando os valores do formulário com um ID único baseado na data/hora.
      const novoProduto = {
        ...this.formularioProduto.value,
        id: Date.now().toString() 
      };

      /*
       * Envia o novo produto para o Service. 
       * Isso atualizará o Signal de produtos, fazendo-o aparecer na tela instantaneamente.
       */
      this.servicoProduto.adicionarProduto(novoProduto as any);
      
      console.log('Produto salvo com sucesso:', novoProduto);
      
      /*
       * Redireciona o usuário para a rota '/produtos'.
       *  ele cadastra aqui e o item já está lá na tela.
       */
      this.router.navigate(['/produtos']);
    }
  }
}