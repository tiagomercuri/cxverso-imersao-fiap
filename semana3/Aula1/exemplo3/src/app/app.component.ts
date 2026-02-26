// importar o decorator e o signal
import { Component, signal } from '@angular/core';
//biblioteca para habilitar o uso do [(ngModel) Two-way Binding]
import { FormsModule } from '@angular/forms';
 
 
// decorator
/*
é como um selo que ajuda a identificar e manusear suas classes
*/
 
@Component({
  selector: 'app-root',
  imports:[FormsModule], // lista de ferramentar externar que o componente vai usar.
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // signal=função que vai guardar um valor que o angular vai mostrar
  //lista de posts (array) usando signal
  posts =signal ([
    {titulo:"Postagem 1",conteudo:'Detalhes da postagem 1'},
    {titulo:"Postagem 2",conteudo:'Detalhes da postagem 2'},
  ]);

  // signals para caputrar os dados do novo post (Two-way Binding)
  novoTitulo =signal('');
  novoConteudo =signal('');

  /*********************************************************************/
  /*  ADICIONAR E EDITAR POST                                          */
  /*********************************************************************/

  // Signal para editar, armezana o posta que esta em edição (null se nenhum)
  postEditado = signal<any>(null);
  //Função para adicionar um novo posta na lista 
  adicionarPost(){
    if(this.novoTitulo() && this.novoConteudo()){
      // atualiza a lista pega os dados antigos e adiciona o novo no topo
      this.posts.update(lista=>[
        {titulo: this.novoTitulo(), conteudo: this.novoConteudo()},
        ...lista
      ]);
      this.novoTitulo.set('');
      this.novoConteudo.set('');
    }else{
      alert("Preencha todos os campos")
    }
  }
/*********************************************************************/
  /*  EXCLUIR POST                                                   */
  /*******************************************************************/

  // função excluir post
  excluirPost(postRemover:any){
    // recebe toda a lista atualiza, ao filtra apaga somente o post que deseja remover
    this.posts.update(listaAtual=>listaAtual.filter(post =>post !== postRemover)
    );
  }
/*********************************************************************/
  /*  EDITAR POST                                                   */
  /*******************************************************************/
// quando estiver em modo edição preenche todos os campos
  editarPost(post:any){
    this.postEditado.set(post);
    this.novoTitulo.set(post.titulo);
    this.novoConteudo.set(post.conteudo);
  }

  // função que salva as alterações no post em edição
  salvarEditar(){
    this.posts.update(lista =>{
      return lista.map(p =>{
        if(p === this.postEditado()){
          return {titulo:this.novoTitulo(), conteudo: this.novoConteudo()};
        }
        return p;
         })
    });

    // limpa os campso apos salvar
    this.cancelarEdicao();
  }

  // função cancelar edição

  cancelarEdicao(){
    this.postEditado.set(null);
    this.novoTitulo.set('');
    this.novoConteudo.set('');
  }

}