Desafio:

Portal de Vendas CaixaDrive Concessionária

O sistema deve permitir que o cliente navegue pelo catálogo e gerencie suas intenções de compra em um painel personalizado.

Requisitos Funcionais 

Acesso ao Portal: Tela de login vinculada ao usuarios.json para identificar o perfil do cliente (VIP, Standard ou Admin).

Catálogo: Exibir o estoque de veículos elétricos usando Cards Visuais.

Cada card deve conter: Foto do modelo, Descrição, Preço e Botão "Reservar Veículo".

Gestão de Reservas (Meu Perfil): Espaço onde o cliente visualiza seus dados e a lista de carros que ele marcou interesse.

Os dados devem persistir no navegador (LocalStorage) para simular uma reserva real.

Segurança de Rota: Impedir que curiosos acessem o catálogo sem estarem devidamente logados no portal.


Estrutura principais

estoque.json	Lista de veículos (ID, Modelo, Preço, Imagem).

usuarios.json	Base de clientes autorizados.

auth.guard.ts	Proteção de entrada no catálogo.

consorcio.resolver.ts	Carregamento antecipado do catálogo.

app.routes.ts - gerenciar as rotas

perfil.component.ts	Painel de controle do comprador.