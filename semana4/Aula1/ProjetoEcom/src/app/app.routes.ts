// Importa o tipo 'Routes' para definir as regras de navegação da aplicação.
import { Routes } from '@angular/router';

// Importa o Guard que protege as rotas administrativas contra usuários não autorizados.
import { adminGuard } from './core/guards/admin.guard';

// Importa o Resolver que busca os dados do produto antes da página de detalhes abrir.
import { produtoResolver } from './core/resolvers/produto.resolver';

// Importa o componente de Login (carregado diretamente para ser a porta de entrada).
import { LoginComponent } from './components/login.component/login.component';

export const routes: Routes = [

  // Rota de Login: Acesso direto para autenticação do usuário.
  { path: 'login', component: LoginComponent },

  /** * Rota Pública: Catálogo (O que o USUARIO vê)
   * Usamos 'children' para agrupar todas as rotas que começam com /produtos.
   */
  {
    path: 'produtos',
    children: [
      { 
        path: '', 
        /** LAZY LOADING: O componente só é baixado pelo navegador quando o usuário entra na lista.
         * Isso deixa o carregamento inicial do site muito mais rápido. */
        loadComponent: () => import('./components/catalogo/lista-produto.component/lista-produto.component').then(m => m.ProdutoListaComponent)
      },
      { 
        path: ':id', 
        // Define uma rota dinâmica que aceita um ID (ex: /produtos/1).
        loadComponent: () => import('./components/catalogo/detalhes-produto.component/detalhes-produto.component').then(m => m.DetalheComponent),
        /** RESOLVE: Antes de abrir a tela, o Angular executa o resolver para buscar o produto. */
        resolve: { produto: produtoResolver } 
      }
    ]
  },

  /** * Rota Protegida: Administração (O que o ADMIN vê)
   * canActivate: O segurança (Guard) verifica aqui se o usuário é admin antes de permitir a entrada.
   */
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      { 
        path: 'dashboard', 
        loadComponent: () => import('./components/admin/dashboard.component/dashboard.component').then(m => m.DashboardComponent)
      },
      { 
        path: 'novo-produto', 
        // Carrega o formulário de cadastro, isolado na área administrativa.
        loadComponent: () => import('./components/admin/novo-produto.component/novo-produto.component').then(m => m.ProdutoFormComponent)
      }
    ]
  },

  // Rota Padrão: Se o usuário acessar a raiz (/) ou uma rota inexistente, ele é enviado para a tela.
  { path: '', redirectTo: 'produtos', pathMatch: 'full' }
];