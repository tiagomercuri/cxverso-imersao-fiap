// importar o decorator e o signal
import { Component, signal } from '@angular/core';


// decoretor
//é como um selo que ajuda a identificar e manusear suas classes
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // Criando um signal que vai iniciar com 0
  contador = signal(0);

  // função para incrementar o valor 
  incrementar(){
    this.contador.update(valor =>valor +1);
  }
  
  // função para resetar o valor
 resetar(){
  this.contador.set(0);
 }
}
