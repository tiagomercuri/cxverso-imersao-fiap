// Importa os decoradores e funções de reatividade moderna do Angular (Signals e Computed).
import { Injectable, inject, signal, computed } from '@angular/core';
// Importa o cliente HTTP para buscar o arquivo de usuários (simulando um banco de dados).
import { HttpClient } from '@angular/common/http';
// Importa operadores do RxJS para transformar os dados que chegam do arquivo JSON.
import { map, Observable } from 'rxjs';
// Importa a interface que define o contrato de como um usuário deve ser no sistema.
import { Usuario } from '../../models/usuario'; 

@Injectable({ providedIn: 'root' }) // Torna o serviço um "Singleton", único para toda a aplicação.
export class AuthService {
  private http = inject(HttpClient);
  
  /* Gerenciamento de Estado com Signals:
   * Criamos um sinal privado que guarda o usuário logado ou null.
   * Ele já inicia tentando recuperar uma sessão ativa do LocalStorage.
   */
  private _user = signal<Usuario | null>(this.getUserFromStorage());

  // Expõe apenas a leitura do sinal, impedindo que componentes alterem o usuário sem passar pelo login.
  currentUser = this._user.asReadonly();
  
  /* Propriedades Computadas (Derivadas):
   * O 'isAdmin' reage automaticamente ao sinal '_user'. 
   * Se a role mudar para 'admin', a aplicação inteira fica sabendo na hora.
   */
  isAdmin = computed(() => this._user()?.role === 'admin');
  
  // Verifica se existe um token ativo para considerar o usuário como autenticado.
  isAuthenticated = computed(() => !!this._user()?.token);

  /*
   * Método de Login: Busca no arquivo JSON e valida as credenciais digitadas.
   */
  login(email: string, password: string): Observable<boolean> {
    return this.http.get<Usuario[]>('/usuarios.json').pipe( 
      map(users => {
        // Tenta encontrar um usuário que coincida com e-mail e senha.
        const userEncontrado = users.find(u => u.email === email && u.password === password);
        
        if (userEncontrado) {
          // Monta o objeto completo do usuário para ser guardado no estado da aplicação.
          const usuario: Usuario = {
            id: userEncontrado.id,
            name: userEncontrado.name,
            role: userEncontrado.role,
            token: userEncontrado.token,
            email: userEncontrado.email,
            password: userEncontrado.password 
          };

          // ATUALIZAÇÃO DO ESTADO: O sinal avisa o Guard e a Navbar que o usuário logou!.
          this._user.set(usuario); 
          
          // PERSISTÊNCIA: Guarda a sessão para que o usuário não precise logar de novo ao dar F5.
          localStorage.setItem('user_session', JSON.stringify(usuario)); 

          return true; 
        }
        return false;
      })
    );
  }

  // Limpa o estado e remove a sessão do navegador ao sair.
  logout() {
    this._user.set(null);
    localStorage.removeItem('user_session');
  }

  // Função auxiliar para verificar se o usuário já estava logado antes da página carregar.
  private getUserFromStorage(): Usuario | null {
    const data = localStorage.getItem('user_session');
    return data ? JSON.parse(data) : null;
  }
}