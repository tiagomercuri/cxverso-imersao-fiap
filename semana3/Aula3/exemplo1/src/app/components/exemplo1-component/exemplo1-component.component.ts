import { Component, inject } from '@angular/core';
//ReactiveFormsModule- é o motor que faz os formularios inteligentes funcionarem
//FormBuilder- como um "Construtor"- ajuda a criar a estrutura do formulariode forma rápida
//Validators- contém as regras de segurança Ex. Campo Obrigatário (fiscal)
import { ReactiveFormsModule,FormBuilder,Validators } from '@angular/forms'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exemplo1-component',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './exemplo1-component.component.html',
  styleUrl: './exemplo1-component.component.css'
})
export class Exemplo1ComponentComponent {
  // INJEÇÃO DE DEPENDÊNCIA ajuda a motar o formulario sempre que tenha que fazer do zero
   private form = inject(FormBuilder);
 
   // Definindo a estrutura e as validações
   cadastroForm =this.form.group({
     // '' - campo vazio, não pode deixar em branco, minimo de 3 caracteres
     nome:['',[Validators.required,Validators.minLength(3)]],
  
     email:['',[Validators.required,Validators.email]],
   })
 //  Função que irá realizar as regras ao clicar no botão
  
 enviar(){
   // verifica se esta tudo ok com o formulário
   if(this.cadastroForm.valid){
     //mensagem
     console.log("Dados enviados", this.cadastroForm.value);
     alert("Cadastro Realizado com sucesso")
   }
 }
  
 }