import { Component, signal, inject, OnInit } from '@angular/core';
import { MotoService } from './service/moto.service';
import { Moto } from './models/moto';
import { FormsModule } from '@angular/forms';
import { MotoCardComponent } from './components/moto-card.component';

@Component({
  selector: 'app-root',
  imports:[FormsModule,MotoCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  // SIGNAL- Lista completa que servirá como banco de dados local na memória
  listaMotos = signal<Moto[]>([]);

  // SIGNAL - lista que realmente vai aparecer na tela 
  motosFiltradas = signal<Moto[]>([]);

  // SIGNAL- Booleano para mostrar ou esconder o carregando na tela
  carregando = signal(false);

  // SIGNAL - Guarda o valor atual do filtro de autonomia
  filtroAutonomia = signal(0);

  // Injeção de dependência - pede para o angular uma instancia de MotoService
  private motoService = inject(MotoService);

  // CICLO DE VIDA  - que roda automaticamente assim que o componente for exibido
  ngOnInit(){
    this.carregarEstoque();
  }
//  função que chama o serviço para buiscar os dados do json
  carregarEstoque(){
    // ativa o aviso de "Carregando"
    this.carregando.set(true);

    // Se inscreve no Observable, quando o json chegar a função dentro do subscribe executa.
    this.motoService.getMotos().subscribe(motos => {
      this.listaMotos.set(motos); //salva a lsita original
      this.motosFiltradas.set(motos); //inicializa a lista na tela com todas as motos
      this.carregando.set(false); //desativa o aviso de carregando
    });
  }

  // função que dispara toda vez que o usario mexerr no filtro autonomia
    filtrar(){
      const valorFiltro= this.filtroAutonomia(); //L~e o valor atual do signal

      // Atualizar a lista filtrada mantendo apenas motos com a autonomia maior ou igual ao filtro
      this.motosFiltradas.set(
        this.listaMotos().filter(m=> m.autonomia >= valorFiltro)
      )

    }
    // Função para interagir com usuario ao clicar no botão.
    comprar(moto: Moto){
      alert(`Solicitação de compra envia com sucesso:${moto.modelo}`);
    }

  }
