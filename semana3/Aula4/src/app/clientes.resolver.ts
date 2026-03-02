import {inject} from '@angular/core'
import { ResolveFn } from '@angular/router'//Tipo que define que a função é um resolver de rotas
import { ApiService } from './services/api.service'
import { Cliente } from './models/cliente.interface'

export const clienteResolver: ResolveFn<Cliente[]> =()=>{
     const service = inject(ApiService)
     return service.getTodosClientes();
}

