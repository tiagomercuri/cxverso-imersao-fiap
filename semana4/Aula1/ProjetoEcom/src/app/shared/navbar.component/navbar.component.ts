// Importa o decorador Component e a função inject para gerenciar dependências de forma moderna.
import { Component, inject } from '@angular/core';

// Importa o RouterModule (para os links routerLink) e o Router (para navegação via código).
import { RouterModule, Router } from '@angular/router';

// Importa o serviço de autenticação, que contém os Signals de estado do usuário.
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule], // Necessário para que o Angular entenda as diretivas de navegação no HTML.
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  /* Injeta o AuthService e o torna PÚBLICO.
   * IMPORTANTE: No Angular, se você quiser usar variáveis de um serviço direto no HTML 
   * (ex: authService.isAuthenticated()), elas precisam ser públicas.
   */
  public authService = inject(AuthService); 
  
  // Injeta o roteador para redirecionar o usuário após o logout.
  private router = inject(Router);

  /*
   * Método de encerramento de sessão.
   * Ele coordena a limpeza dos dados e a segurança da navegação.
   */
  logout() {
    // 1-Aciona o serviço para limpar o Signal de usuário e remover o item do LocalStorage.
    this.authService.logout(); 

    // 2-Redireciona o usuário para a tela de login, garantindo que ele não fique em áreas restritas.
    this.router.navigate(['/login']); 
  }
}