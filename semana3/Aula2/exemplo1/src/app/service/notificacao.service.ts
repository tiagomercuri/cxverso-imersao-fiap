import { Injectable } from "@angular/core";
import { Observable,of,delay,concatMap,from } from "rxjs";//ferramentas do RxJS
 
//DECORATOR
@Injectable({
 providedIn:'root' //DI- Diz que este serviço estpa disponivel para o app
})
 
export class NotificacaoService{
 
    //OBSERVABLE - simulação de uma resposta que vem da internet com atraso(deplay)
    buscarAvisos(): Observable<string>{
 
        const mensagens =[
            {texto:"Seu Pedido saiu para entrega",tempo:2000},
            {texto:"o entregador chegou",tempo:4000},
        ];
 
 
        // of - é um operador de criação serve para pegar qualquer valor e embrulhar em um observable
       
        // return of("Seu Pedido saiu para entrega").pipe(
        //     delay(2000) //RxJS espera 2 segundo antes de enviar
        
        // from transforma o array em um fluxo de dados
        return from(mensagens).pipe(
               concatMap(item =>
                //para cada item criamos um observable que espera o tempo definido
                of(item.texto).pipe(delay(item.tempo))
               )
        );
    }
}