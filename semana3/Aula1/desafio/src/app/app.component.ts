// importar o decorator Component, o signal e o FormsModule
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

// decorator - identifica essa classe como um componente Angular
@Component({
  selector: 'app-root',
  imports: [FormsModule], // FormsModule permite usar [(ngModel)] nos inputs
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // signal = função reativa que guarda a lista de tickets
  // quando a lista muda, o Angular atualiza a tela automaticamente
  tickets = signal<any[]>([]);

  // variáveis simples para guardar o que o atendente digita no formulário
  novoNome = '';
  novoProblema = '';

  // variáveis para controlar a edição
  ticketEditado: any = null; // guarda o ticket que está sendo editado
  indiceEditado = -1;        // guarda a posição do ticket na lista

  // método para cadastrar um novo ticket
  adicionarTicket() {
    // validação: verifica se os campos foram preenchidos
    if (!this.novoNome || !this.novoProblema) {
      alert('Preencha o nome do cliente e o problema antes de cadastrar!');
      return;
    }

    // adiciona o novo ticket no início da lista
    this.tickets.update((lista: any[]) => [
      { nome: this.novoNome, problema: this.novoProblema },
      ...lista
    ]);

    // limpa os campos do formulário
    this.novoNome = '';
    this.novoProblema = '';
  }

  // método para iniciar a edição de um ticket
  editarTicket(ticket: any, index: number) {
    this.ticketEditado = ticket;         // guarda qual ticket está sendo editado
    this.indiceEditado = index;          // guarda a posição na lista
    this.novoNome = ticket.nome;         // preenche o formulário com os dados atuais
    this.novoProblema = ticket.problema;
  }

  // método para salvar as alterações feitas na edição
  salvarEdicao() {
    // percorre a lista e atualiza apenas o ticket editado
    this.tickets.update((lista: any[]) =>
      lista.map((t: any, i: number) =>
        i === this.indiceEditado
          ? { nome: this.novoNome, problema: this.novoProblema }
          : t
      )
    );
    this.cancelarEdicao(); // limpa o modo de edição
  }

  // método para cancelar a edição sem salvar
  cancelarEdicao() {
    this.ticketEditado = null;
    this.indiceEditado = -1;
    this.novoNome = '';
    this.novoProblema = '';
  }

  // método para marcar um ticket como resolvido (remove da lista)
  resolverTicket(index: number) {
    this.tickets.update((lista: any[]) => lista.filter((_: any, i: number) => i !== index));
  }
}
