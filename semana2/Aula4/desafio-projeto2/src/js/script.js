"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Catalogo {
    constructor() {
        this.allCursos = []; // Cache local de todos os cursos
        // Tenta localizar no HTML o elemento onde os cards serão exibidos
        this.container = document.getElementById('cursosGrid');
        // Tenta localizar o campo de entrada de texto usado para o filtro
        // O "as HTMLInputElement" avisa ao TypeScript que este elemento terá a propriedade '.value'
        this.searchInput = document.getElementById('filterInput');
        // Verificação de segurança essencial: só prossegue se ambos os elementos existirem na página
        if (this.container && this.searchInput) {
            // Inicia o processo de busca de dados (fetch) e configuração do sistema
            this.init();
        }
    }
    // Promessa
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Busca o arquivo JSON de forma assíncrona
                const response = yield fetch('./cursos.json');
                if (!response.ok)
                    throw new Error('Erro ao carregar dados');
                // Converte a resposta bruta em um objeto JS/TS (array de Cursos)
                this.allCursos = yield response.json();
                this.render(this.allCursos); // Desenha os cards iniciais na tela
                this.setupFilter(); // Ativa a lógica do campo de busca
            }
            catch (error) {
                // Caso o arquivo falte ou ocorra um erro de rede, avisa o usuário
                if (this.container) {
                    this.container.innerHTML = `<p class="empty-msg">Erro ao carregar os cursos. Tente novamente.</p>`;
                }
            }
        });
    }
    setupFilter() {
        var _a;
        // Adiciona um ouvinte ao input de busca que dispara toda vez que o usuário digita algo
        (_a = this.searchInput) === null || _a === void 0 ? void 0 : _a.addEventListener('input', () => {
            var _a;
            // Captura o valor digitado e transforma em minúsculas (Case Insensitive)
            // Se o valor for nulo, define uma string vazia como padrão
            const query = ((_a = this.searchInput) === null || _a === void 0 ? void 0 : _a.value.toLowerCase()) || '';
            // Cria um novo array apenas com os cursos que atendem aos critérios de busca
            const filtered = this.allCursos.filter(curso => 
            // Critério 1: O título do curso contém o que foi digitado?
            curso.titulo.toLowerCase().includes(query) ||
                // Critério 2: Ou a categoria do curso contém o que foi digitado?
                curso.categoria.toLowerCase().includes(query));
            // Chama o método de renderização passando apenas a lista filtrada para atualizar a tela
            this.render(filtered);
        });
    }
    render(cursos) {
        // Se o container não for encontrado no DOM, interrompe a execução por segurança
        if (!this.container)
            return;
        // Se a busca não encontrar nada, exibe mensagem amigável
        if (cursos.length === 0) {
            this.container.innerHTML = `<p class="empty-msg">Nenhum curso encontrado.</p>`;
            return;
        }
        // Transforma cada objeto de curso em um bloco de código HTML (Card)
        this.container.innerHTML = cursos.map(curso => `
            <article class="curso-card">
                <span class="nivel">${curso.nivel}</span>
                <h3 class="card-titulo">${curso.titulo}</h3>
                <p class="card-desc"><strong>${curso.categoria}</strong>: ${curso.descricao}</p>
                <button class="btn-saiba-mais">Saber mais</button>
            </article>
        `).join(''); // O .join('') une todos os blocos gerados e evita que apareçam vírgulas entre os cards
    }
}
class MenuNavigation {
    constructor() {
        // Busca o botão no HTML pelo ID e força o tipo (casting) para Button
        this.btn = document.getElementById('btnMenu');
        // Busca o elemento do menu pelo ID
        this.menu = document.getElementById('menuLinks');
        // Verificação de segurança: só prossegue se ambos os elementos existirem na página
        if (this.btn && this.menu) {
            // Chama o método que vai "escutar" as interações do usuário
            this.bindEvents();
        }
    }
    bindEvents() {
        var _a, _b;
        // O uso do '?' tenta adicionar o evento apenas se o botão existir
        // Abre/fecha o menu ao clicar no botão hambúrguer
        (_a = this.btn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => this.toggleMenu());
        // Se clicar em qualquer elemento dentro do menu, ele fecha sozinho
        (_b = this.menu) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (e) => {
            const target = e.target;
            if (target.tagName === 'A') {
                this.closeMenu();
            }
        });
    }
    toggleMenu() {
        // Validação de segurança: se o menu ou botão sumirem do DOM, interrompe a função
        if (!this.menu || !this.btn)
            return;
        // Alterna a classe 'active' no menu: se tiver, remove; se não tiver, adiciona
        // A variável 'isOpen' recebe true se a classe foi adicionada, ou false se removida
        const isOpen = this.menu.classList.toggle('active');
        // Alterna a classe 'open' no botão (usada para animar o ícone do hambúrguer para o X no CSS)
        this.btn.classList.toggle('open');
        // Atualiza o atributo ARIA para que cegos ou pessoas com baixa visão saibam
        // via leitor de tela se o conteúdo do menu está expandido (true) ou recolhido (false)
        this.btn.setAttribute('aria-expanded', isOpen.toString());
    }
    closeMenu() {
        var _a, _b, _c;
        // O uso do '?' tenta remover a classe 'active' apenas se 'this.menu' existir
        (_a = this.menu) === null || _a === void 0 ? void 0 : _a.classList.remove('active');
        // Remove a classe 'open' do botão, forçando o ícone a voltar ao estado de hambúrguer
        (_b = this.btn) === null || _b === void 0 ? void 0 : _b.classList.remove('open');
        // Atualiza o atributo ARIA indicando aos leitores de tela que o menu está fechado
        (_c = this.btn) === null || _c === void 0 ? void 0 : _c.setAttribute('aria-expanded', 'false');
    }
}
// Inicialização segura: só roda quando o HTML estiver completamente carregado na tela
window.addEventListener('DOMContentLoaded', () => {
    new MenuNavigation(); // Instancia o menu interativo
    new Catalogo(); // Instancia a listagem e filtro de cursos
});
