<div class="loja">
  
  <aside class="painel-cadastro">
    <div class="card">
      <h3>Cliente</h3>
      <form [formGroup]="formCliente" (ngSubmit)="salvarCliente()">
        <input formControlName="nome" placeholder="Nome do Cliente">
        <button type="submit" [disabled]="formCliente.invalid">Confirmar Cliente</button>
      </form>
      @if (clienteCadastrado()) {
        <p class="status">Atendendo: <strong>{{ clienteCadastrado() }}</strong></p>
      }
    </div>

    <div class="card">
      <h3>Novo Produto</h3>
      <form [formGroup]="formProduto" (ngSubmit)="adicionarProduto()">
        <input formControlName="nome" placeholder="Nome do Produto">
        <input type="number" formControlName="preco" placeholder="Preço R$">
        <button type="submit" [disabled]="formProduto.invalid" class="btn-add">+ Adicionar</button>
      </form>
    </div>
  </aside>

  <main class="painel-lista">
    <div class="card list-card">
      <div class="list-header">
        <h3>Itens do Pedido</h3>
        <span class="badge">{{ listaProdutos().length }} itens</span>
      </div>

      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          @for (prod of listaProdutos(); track prod.id) {
            <tr class="fade-in">
              <td>{{ prod.nome }}</td>
              <td>{{ prod.preco | currency:'BRL' }}</td>
              <td>
                <button (click)="excluirProduto(prod.id)" class="btn-del">Apagar</button>
              </td>
            </tr>
          } @empty {
            <tr>
              <td colspan="3" class="empty-msg">Nenhum produto cadastrado.</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  </main>
</div>