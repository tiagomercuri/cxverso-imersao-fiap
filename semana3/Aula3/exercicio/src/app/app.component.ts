import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Produto } from './models/produto.model';


@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


  // Injeção de dependência do construtor de formulários
  private form = inject(FormBuilder);

  // 1. SIGNAL PARA ESTADO
  // Armazena o nome do cliente logado
  clienteCadastrado = signal<string | null>(null);
  
  // Armazena a lista de produtos
  listaProdutos = signal<Produto[]>([]);

  // 2. CONFIGURAÇÃO DOS FORMULÁRIOS
  // Formulário do Cliente
  formCliente = this.form.group({
    nome: ['', [Validators.required, Validators.minLength(3)]]
  });

  // Formulário do Produto
  formProduto = this.form.group({
    nome: ['', Validators.required],
    preco: [0, [Validators.required, Validators.min(0.01)]]
  });

  // 3. MÉTODOS (AÇÕES)

  // Salva o nome do cliente no Signal e limpa o formulário
  salvarCliente() {
    if (this.formCliente.valid) {
      const nome = this.formCliente.value.nome;
      if (nome) {
        this.clienteCadastrado.set(nome);
        this.formCliente.reset();
      }
    }
  }

  // Cria um objeto produto, adiciona na lista (Signal) e limpa o formulário
  adicionarProduto() {
    if (this.formProduto.valid) {
      const novoProduto: Produto = {
        id: Date.now(), // Gera um ID único baseado no tempo
        nome: this.formProduto.value.nome!,
        preco: this.formProduto.value.preco!
      };

      // Atualiza o signal da lista adicionando o novo item
      this.listaProdutos.update(listaAtual => [...listaAtual, novoProduto]);
      
      // Reseta o form para permitir nova entrada
      this.formProduto.reset();
    }
  }

  // Remove um produto da lista filtrando pelo ID
  excluirProduto(id: number) {
    this.listaProdutos.update(listaAtual => 
      listaAtual.filter(prod => prod.id !== id)
    );
  }
}