import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { clienteResolver } from './clientes.resolver';

export const routes: Routes = [
    // Rota de Login 
    {path:'login',component: LoginComponent},

    {
        path:'dashboard',
        component:LayoutComponent,
        canActivate:[authGuard], //Protege a Rota pai, ninguem acessa sem estar logado
        canActivateChild:[authGuard], //Protege toda as rotas filhas automatticamente

        // Rotas Filhas
    children:[
        {path:'perfil',
            component:PerfilComponent
        },
        {path:'clientes',
            component:ClienteComponent,
            // data passa informações para o guard como pode acessa o admin
            data:{role:"admin"},
            // Resolver  só vai carregar a tela quando clienteResolver terminar de buscar na base de dados
            resolve:{lista:clienteResolver}
        }
    ]
    },
    // rota padrão
    {path:'',redirectTo:'login',pathMatch:'full'}
];
