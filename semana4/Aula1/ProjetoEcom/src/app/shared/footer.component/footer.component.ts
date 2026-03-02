// Importa o decorador Component para definir a classe como um componente do Angular.
import { Component } from '@angular/core';

// Importa o FormsModule: essencial para habilitar o uso de diretivas de formulário como 'ngModel' e '(ngSubmit)' no HTML.
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-footer',
  // No Angular, componentes standalone precisam importar o FormsModule explicitamente para validar formulários no HTML.
  imports: [FormsModule], 
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  
  /*
   * Método disparado quando o usuário clica no botão de "Assinar".
   * O parâmetro 'formValue' contém o objeto com os dados digitados (ex: { email: 'exemplo@email.com' }).
   */
  onSubmit(formValue: any) {
    // No mercado , aqui enviaríamos o e-mail para um serviço de marketing ou banco de dados.
    console.log('Dados da newsletter recebidos:', formValue);
    
    //'formValue.email' corresponde ao 'name="email"' no input do HTML.
    alert('Obrigado por assinar nossa newsletter: ' + formValue.email);
  }
}