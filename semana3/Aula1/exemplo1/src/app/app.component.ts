// importar o decorator e o signal
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// decorator
/*
é como um selo que ajuda a identificar e manusear suas classes
*/ 
 
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
    // signal=função que vai guardar um valor que o angular vai mostrar
    title = signal('teste1');
}
  