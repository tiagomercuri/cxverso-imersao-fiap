// importar o decorator e o signal
import { Component, signal, inject  } from '@angular/core';
import { NotificacaoService } from './service/notificacao.service';
import { map } from 'rxjs'; // Operador RxJS 

 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrl: './app.component.css'
})
export class AppComponent {
  mensagem =signal("Nenhum aviso");
 
  //DEPENDENCE INJECTION - o angular injeta o serviço automanticamente aqui
  private service =inject(NotificacaoService);
 
  carregar(){
    this.mensagem.set("Carregando...");
 
    //SUBSCRIPTION: inscrenvendo a função no observable para receber o dado
    this.service.buscarAvisos().pipe(
      //RxJS; transforma o dado antes dele chegar no signal
      map(texto =>texto.toUpperCase())
    ).subscribe(valor =>{
      //quando o valor chega , atualiza o signal.
      this.mensagem.set(valor)
    })
  }
}