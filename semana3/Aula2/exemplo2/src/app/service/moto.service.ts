import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Moto } from "../models/moto";


@Injectable({
    providedIn: 'root'
})
export class MotoService{
    //Sai pela internet para realizar as buscas
    private http = inject(HttpClient);

    private jsonUrl='motos.json';


    // função que busca todas as motos 
    getMotos(): Observable<Moto[]>{
        //avisa que o arquivo será uma lista de motos
        //envia os dados
        //garante que o que estiver dento da interface Moto[] siga as instruções 
        return this.http.get<Moto[]>(this.jsonUrl);
    }
}