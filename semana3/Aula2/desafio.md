O Gerenciador de Carteira Digital

Desafio:
 
Você deve criar um sistema que liste as transações bancárias de um cliente. 
O usuário deve conseguir filtrar as transações por tipo (Entrada ou Saída) 
e o sistema deve calcular o saldo total automaticamente.

Estrutura do Projeto

models/transacao.ts: A ficha técnica da transação.

service/extrato.service.ts: O garçom que busca os dados (simulando um JSON).

components/item-transacao/: A etiqueta individual de cada gasto/ganho.

app.ts: O gerente que faz as contas e aplica os filtros.