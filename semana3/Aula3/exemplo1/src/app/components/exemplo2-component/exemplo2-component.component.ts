import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-exemplo2-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './exemplo2-component.component.html',
  styleUrl: './exemplo2-component.component.css'
})
export class Exemplo2ComponentComponent {
private form=inject(FormBuilder);
 
  investForm = this.form.group({
 
    ativos:this.form.array([
      this.form.control('',Validators.required)
    ])
  })
 
  // Get é como um atalho ou apelido
  //O this o angular entende que eatamos indo buscar a lista dentro do form
  //as FormArray - avisa o TypeScript que pode confiar, garantindo que é uma lista
  get ativos(){
    return this.investForm.get('ativos') as FormArray;
  }
// FUNÇÃO -adicionar ativo
  adicionarAtivo(){
    this.ativos.push(this.form.control('',Validators.required))
  }
  // FUNÇÃO -remover ativo
  removerAtivo(index: number){
    this.ativos.removeAt(index)
  }
  // FUNÇÃO -salvar ativo
  salvar(){
    console.log(`Seus investimentos`,this.investForm.value)
  }
}
