/**
 * Importa o tipo 'ApplicationConfig', que define a estrutura de configuração do app,
 * e o 'provideBrowserGlobalErrorListeners', uma novidade do Angular para capturar erros globais.
 */
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
// Importa a função que "ensina" ao Angular como lidar com as rotas de navegação.
import { provideRouter } from '@angular/router';
// Importa a lista de rotas (o mapa) que você definiu no arquivo 'app.routes.ts'.
import { routes } from './app.routes';
/**
 * A constante 'appConfig' é o coração da inicialização.
 * Tudo o que for colocado no array 'providers' ficará disponível para TODO o projeto.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    /*GERENCIADOR DE ERROS: 
     * Configura o navegador para ouvir e reportar erros que aconteçam na aplicação,
     * ajudando o desenvolvedor a encontrar bugs mais rápido.
     */
    provideBrowserGlobalErrorListeners(),

    /*PROVEDOR DE ROTAS:
     * Liga o motor de navegação do Angular usando o mapa de rotas que criamos.
     * Sem isso, os links (routerLink) e o redirecionamento não funcionariam.
     */
    provideRouter(routes)
  ]
};
