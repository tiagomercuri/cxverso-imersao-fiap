A corretora "InvesteSmart" precisa de uma nova interface para apresentar seus planos de 
consórcio e fundos de investimento. Seu objetivo é construir a estrutura de estilos (CSS)
utilizando Sass (SCSS), seguindo padrões profissionais de organização de pastas e nomenclatura.

Requisitos Técnicos (As Regras)

1. Arquitetura de Pastas e Arquivos

O projeto deve obrigatoriamente seguir a estrutura abaixo, utilizando arquivos parciais (_):

/abstracts: Deve conter _variables.scss (cores e fontes) e _mixins.scss.

/base: Deve conter _reset.scss (padronização de box-sizing e margens).

/layout: Deve conter _grid.scss (sistema de container e flexbox/grid).

/components: Deve conter _button.scss e _card-investment.scss.

/pages: Deve conter _home.scss (estilos exclusivos do Banner).

/css/ deverá conter o arquivo estilo.css(transpilação)

main.scss: O arquivo mestre que importa todos os anteriores usando @use.

index.html // Frontend da aplicação semâtinco e com acessibilidade


2. Padronização de Código

Metodologia BEM: Todos os componentes devem usar a convenção bloco__elemento--modificador (ex: .card__title, .btn--featured).

Escopo de Módulos: Cada arquivo parcial que utilizar variáveis deve importar o arquivo de origem explicitamente 
com @use '../abstracts/variables' as *;.

Sass Moderno: Para efeitos de hover, utilize o módulo oficial sass:color com a função color.
adjust em vez do antigo lighten ou darken.

3. Desafio de Design

Paleta de Cores: Utilize variáveis para um esquema de cores "Premium" (escolher palheta).

Responsividade: O grid de investimentos deve ser adaptável (mínimo de 300px por card) usando a função repeat(auto-fit, ...).

Interatividade: Os cards devem possuir uma transição suave (transition) que altere levemente sua escala ou elevação ao passar o mouse.