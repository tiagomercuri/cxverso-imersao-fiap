import { Injectable, inject } from "@angular/core";
// Serviço essencial para fazer requisições HTTP
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
//Opeador para capturar e tratar erros de rede
import { catchError } from "rxjs/operators";
import { Cliente } from "../models/cliente.interface";
import { Usuario } from "../models/usuario.interface";

@Injectable({
    providedIn:"root"
})

export class ApiService{

    private http = inject(HttpClient);

    getTodosClientes(): Observable<Cliente[]> {
     return this.http.get<Cliente[]>('clientes.json').pipe( 
        catchError(error=>{
            console.log("erro ao ler os dados",error);

            return of([
                {id:0, nome:'teste',saldo:900,nivel:'sistema'}
            ])
        })
     )
    }
    
    getUsuarios(): Observable<Usuario[]>{
        return this.http.get<Usuario[]>('usuarios.json');
    }
}




