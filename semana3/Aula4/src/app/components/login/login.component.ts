import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-login.component',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
// variaveis ligadas ao html via ngmodule para caputura o que o usuario digita
  usuario ='';
  senha ='';

  // Ferramenta para mudar de página
  private router =inject(Router); 
  private apiService= inject(ApiService);//Ferramenta para buscar os usuarios do json

  entrar(){
    if(!this.usuario || !this.senha){
      alert("Preencha todos so campos")
      return;
    }
    this.apiService.getUsuarios().subscribe({
      next: (listaUsuarios)=> {
        // tenta encontrar um usuario que seja igual ao que foi digitado
        const usuarioEncontrado = listaUsuarios.find(u=>u.usuario === this.usuario && u.senha === this.senha)

          // Se encontrar o usuario salva o estado de login e a role no navegador
          if(usuarioEncontrado){
          
            localStorage.setItem("logado",'true');
            localStorage.setItem('role',usuarioEncontrado.role);
            // redireciona para a pagina de perfil dentro do dashboard 
            this.router.navigate(["/dashboard/perfil"]).then(()=>{
              //recarrega a pagina para que o laout leia a regra no localStorage
              window.location.reload();
            });
           }else{
            alert("Usuario e Senha inválidos")
           }
      },
      // Caso ocorra algum erro 
      error:(error)=>{
        console.error("erro ao carregar a lista de usuarios",error);
        alert("Erro ao conectar com o banco de dados")
      }
      
    })
  }
}
