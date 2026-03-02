// Importa o decorador Component (para definir a classe) e o signal (para dados reativos).
import { Component, signal } from '@angular/core';

// Importa o 'RouterOutlet', que é o espaço reservado para as páginas (rotas) aparecerem.
import { RouterOutlet } from '@angular/router';

/*IMPORTAÇÃO DE COMPONENTES GLOBAIS:
 * Como o Navbar e o Footer aparecem em TODAS as páginas, eles são importados aqui.
 */
import { NavbarComponent } from './shared/navbar.component/navbar.component'; 
import { FooterComponent } from './shared/footer.component/footer.component';

@Component({
  /*SELECTOR 'app-root':
   * É o nome da tag que o Angular procura dentro do seu arquivo 'index.html' para "ligar" o site.
   */
  selector: 'app-root', 
  
  /*REGISTRO DE DEPENDÊNCIAS (Imports):
   * No Angular, precisamos dizer explicitamente quais peças este componente usa.
   * Aqui registramos o motor de rotas e os componentes de layout.
   */
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  /* SIGNAL:
   * Define o título da aplicação de forma reativa. 
   */
  title = signal('exemplo');
}