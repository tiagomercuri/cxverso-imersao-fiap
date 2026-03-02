import { inject } from "@angular/core";
// CanActivateFn -é uma função que returna verdadeiro se usuario tiver permissão ou uma rota 
import {Router,CanActivateFn} from '@angular/router'


export const authGuard: CanActivateFn =(route)=>{
    // Injeta o motor de rotas para redirecionar o usuario.
    const router =inject(Router);

    // busca no localstorage se o usuario passou pela tela de login com sucesso
    const logado = localStorage.getItem('logado') ==="true";

    // buca o cargo salvo (admin ou user) para validar permissões
    const role =localStorage.getItem('role');

    // se o usuario não estiver logado volta para o login
    if(!logado){
        // parseUrl - transforma o texto de um objeto que o angular entende como rota
        return router.parseUrl("/login")
    }
    
    // verifiricar o nivel de acesso do usuario
    // pegar a propridade role que será deifino no arquivo app.routes.ts
    const roleExibido = route.data['role'];

    // se a rota exige um cargo e o usuario não possui o cargo
    if(roleExibido && roleExibido !== role){    
        alert("Acesso Negado, Precisar ser um Administrador")  
        return router.parseUrl('/dashboad/perfil')
    }
    return true;

}