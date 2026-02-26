import { Component,input,output } from "@angular/core";
import { CurrencyPipe } from "@angular/common";
import {Moto} from '../models/moto';

@Component({
    selector:"moto-card",
    imports:[CurrencyPipe],
    templateUrl:"./moto-card.component.html",
    styleUrl:"./moto-card.component.css"
})
export class MotoCardComponent{

    // SIGNAL DE ENTRADA -componente pai que adicona a moto dentro
    moto = input.required<Moto>();
    // SIGNAL DE SAIDA - serve para avisar a todos que algo aconteceu Ex.Mensagem alert
    comprar = output<Moto>();

    // Ação quando clicar no botão
    clickComprar(){
        //  apresenta a mensagem na tela
        this.comprar.emit(this.moto());
    }
}
