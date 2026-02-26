import { Component, signal } from '@angular/core';
// importando as ferramentas de rotas
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports:[RouterModule],//chamado as ferramentas que serão utilizada
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  protected readonly title = signal('exemplo1');
}
