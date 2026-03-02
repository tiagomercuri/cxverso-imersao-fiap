
// Importa o núcleo do Angular para criação do componente e injeção de serviços.
import { Component, inject } from '@angular/core';

// Ferramentas para criar formulários que validam dados em tempo real (email válido, senha mínima).
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

// Serviço de rotas para enviar o usuário para diferentes partes do site após o login.
import { Router } from '@angular/router';

// O Coração da segurança: serviço que verifica se o usuário existe no sistema.
import { AuthService } from '../../core/services/auth.service';

@Component({
  // Habilita o uso de diretivas de formulário (como [formGroup]) no arquivo HTML.
  imports: [ReactiveFormsModule],
  templateUrl:'./login.component.html',
})
export class LoginComponent {
  // Injeção das ferramentas necessárias para o funcionamento da tela.
  private frm = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  /*
   * Configuração do Formulário de Login:
   * - email: Deve ser preenchido e ter formato de e-mail válido.
   * - password: Deve ser preenchido e ter no mínimo 6 caracteres.
   */
  loginForm = this.frm.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

/*
 * Função principal disparada ao clicar no botão de "Entrar".
 * Ela coordena a verificação de dados e o redirecionamento.
 */
handleLogin() {
  if (this.loginForm.valid) {
    // Desestrutura(destruct) os valores do formulário para facilitar o uso.
    const { email, password } = this.loginForm.value;

    /*
     * Chama o método login do AuthService. 
     * Como a verificação pode vir de um arquivo JSON (assíncrono), usamos o .subscribe().
     */
    this.auth.login(email!, password!).subscribe((sucesso) => {
      if (sucesso) {
        
        /*LOGICA DE ROLE (Papéis):
         * Se o usuário for administrador, vai para o painel de controle (Dashboard).
         * Se for um cliente comum, vai direto para a tela de produtos.
         */
        if (this.auth.isAdmin()) {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/produtos']);
        }

      } else {
        // Feedback visual simples caso o e-mail ou senha não constem no usuarios.json.
        alert('Dados incorretos no arquivo usuarios.json');
      }
    });
  }
}
}