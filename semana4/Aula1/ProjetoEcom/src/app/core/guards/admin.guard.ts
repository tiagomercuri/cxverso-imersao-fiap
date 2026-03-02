// Importa o 'inject', que permite usar serviços dentro de funções (já que este Guard não é uma classe).
import { inject } from '@angular/core';

// Importa o tipo 'CanActivateFn' (a regra de acesso) e o 'Router' para redirecionar usuários barrados.
import { CanActivateFn, Router } from '@angular/router';

// Importa o serviço de autenticação para verificar as permissões do usuário logado.
import { AuthService } from '../services/auth.service';

/*
 * Define o 'adminGuard' como uma constante do tipo CanActivateFn.
 * Esta função será executada pelo Angular toda vez que alguém tentar acessar uma rota protegida.
 */
export const adminGuard: CanActivateFn = (route, state) => {
  // Injetamos o AuthService para saber quem é o usuário e o Router para navegação.
  const authService = inject(AuthService);
  const router = inject(Router);

  // Debug: Mostra no console se o usuário atual tem poderes de administrador.
  console.log('Guard checando admin:', authService.isAdmin());

  /* REGRA:
   * Se o método isAdmin() retornar verdadeiro, a função retorna 'true' e o Angular permite o acesso.
   */
  if (authService.isAdmin()) {
    return true;
  }

  // Se chegou aqui, é porque não é admin. Emitimos um aviso no console para o desenvolvedor.
  console.warn('Acesso negado: Usuário não possui permissão de administrador.');
  alert('Acesso negado: Usuário não possui permissão de administrador.');

  /* REDIRECIONAMENTO:
   * Em vez de apenas barrar, enviamos o usuário de volta para a tela de login.
   * O 'parseUrl' transforma a string em um objeto que o Angular entende como rota.
   */
  return router.parseUrl('/login'); 
};