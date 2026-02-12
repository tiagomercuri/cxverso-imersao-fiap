// 2. Classe Principal
class ExploradorDestinos {
    postAtual = null;
    constructor() {
        this.iniciar();
    }
    // Função que liga os botões e carrega dados iniciais
    iniciar() {
        const btnBuscar = document.getElementById('btn-postagem');
        const btnSalvar = document.getElementById('btn-favorito');
        btnBuscar?.addEventListener('click', () => this.buscarDestino());
        btnSalvar?.addEventListener('click', () => this.salvarFavorito());
        this.obterLocalizacao();
        this.carregarFavoritos();
    }
    // Geolocalização (Callbacks)
    obterLocalizacao() {
        const spanLocal = document.getElementById('localizacao');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((posicao) => {
                const lat = posicao.coords.latitude.toFixed(4);
                const long = posicao.coords.longitude.toFixed(4);
                if (spanLocal)
                    spanLocal.innerText = `Lat: ${lat}, Long: ${long}`;
            }, (erro) => {
                console.error(erro);
                if (spanLocal)
                    spanLocal.innerText = "Não foi possível obter localização.";
            });
        }
        else {
            if (spanLocal)
                spanLocal.innerText = "Navegador não suporta geolocalização.";
        }
    }
    // (Buscar Post Aleatório)
    async buscarDestino() {
        const idAleatorio = Math.floor(Math.random() * 100) + 1;
        try {
            // Busca na API
            const resposta = await fetch(`https://jsonplaceholder.typicode.com/posts/${idAleatorio}`);
            const dados = await resposta.json();
            this.postAtual = dados;
            const elementoTitulo = document.getElementById('t-postagem');
            if (elementoTitulo) {
                elementoTitulo.innerText = dados.title;
            }
        }
        catch (erro) {
            console.error("Erro ao buscar destino:", erro);
        }
    }
    salvarFavorito() {
        // Só salva se tiver um post carregado
        if (!this.postAtual) {
            alert("Busque um destino antes de salvar!");
            return;
        }
        const listaTexto = localStorage.getItem('meus_favoritos');
        const favoritos = listaTexto ? JSON.parse(listaTexto) : [];
        favoritos.push(this.postAtual.title);
        localStorage.setItem('meus_favoritos', JSON.stringify(favoritos));
        this.carregarFavoritos();
    }
    carregarFavoritos() {
        const listaUl = document.getElementById('lista-favoritos');
        const listaTexto = localStorage.getItem('meus_favoritos');
        if (listaTexto && listaUl) {
            const favoritos = JSON.parse(listaTexto);
            listaUl.innerHTML = '';
            favoritos.forEach((titulo) => {
                const li = document.createElement('li');
                li.innerText = titulo;
                listaUl.appendChild(li);
            });
        }
    }
}
new ExploradorDestinos();
export {};
