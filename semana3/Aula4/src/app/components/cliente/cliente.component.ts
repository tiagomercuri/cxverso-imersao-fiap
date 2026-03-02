import { Component, inject,signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Cliente } from '../../models/cliente.interface';

@Component({
  selector: 'app-cliente',
  imports: [CommonModule,CurrencyPipe],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {

  private route = inject(ActivatedRoute);

  lista =signal<Cliente[]>([]);

  ngOnInit(){
    const dadosbuscados = this.route.snapshot.data['lista'];

    if(dadosbuscados){
      this.lista.set(dadosbuscados)
    }
  }
}
