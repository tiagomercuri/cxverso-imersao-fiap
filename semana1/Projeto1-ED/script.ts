// 1. Interface (Contrato dos dados)
interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string;
}

class ExploradorPost {
    private postAtual: IPost | null = null;

    constructor() {
        this.iniciar();
    }

    // Função que liga os botões e carrega dados iniciais
    private iniciar(): void {
        const btnBuscar = document.getElementById('btn-postagem');
        const btnSalvar = document.getElementById('btn-favorito');

        btnBuscar?.addEventListener('click', () => this.buscarPost());
        btnSalvar?.addEventListener('click', () => this.salvarFavorito());

        this.obterLocalizacao();
        this.carregarFavoritos();
    }

    // Geolocalização (Callbacks)
    public obterLocalizacao(): void {
        const spanLocal = document.getElementById('localizacao');

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (posicao) => {
                    const lat = posicao.coords.latitude.toFixed(4);
                    const long = posicao.coords.longitude.toFixed(4);
                    if (spanLocal) spanLocal.innerText = `Lat: ${lat}, Long: ${long}`;
                },
                (erro) => {
                    console.error(erro);
                    if (spanLocal) spanLocal.innerText = "Não foi possível obter localização.";
                }
            );
        } else {
            if (spanLocal) spanLocal.innerText = "Navegador não suporta geolocalização.";
        }
    }

    // (Buscar Post Aleatório)
    public async buscarPost(): Promise<void> {
        const idAleatorio = Math.floor(Math.random() * 100) + 1;
        
        try {
            // Busca na API
            const resposta = await fetch(`https://jsonplaceholder.typicode.com/posts/${idAleatorio}`);
            const dados: IPost = await resposta.json();

            this.postAtual = dados;

            const elementoTitulo = document.getElementById('t-postagem');
            if (elementoTitulo) {
                elementoTitulo.innerText = dados.title;
            }

        } catch (erro) {
            console.error("Erro ao buscar post:", erro);
        }
    }

    public salvarFavorito(): void {
        // Só salva se tiver um post carregado
        if (!this.postAtual) {
            alert("Busque um post antes de salvar!");
            return;
        }

        const listaTexto = localStorage.getItem('meus_favoritos');
        const favoritos: string[] = listaTexto ? JSON.parse(listaTexto) : [];

        favoritos.push(this.postAtual.title);

        localStorage.setItem('meus_favoritos', JSON.stringify(favoritos));

        this.carregarFavoritos();
    }

    public carregarFavoritos(): void {
        const listaUl = document.getElementById('lista-favoritos');
        
        const listaTexto = localStorage.getItem('meus_favoritos');
        
        if (listaTexto && listaUl) {
            const favoritos: string[] = JSON.parse(listaTexto);

            listaUl.innerHTML = '';

            favoritos.forEach((titulo) => {
                const li = document.createElement('li');
                li.innerText = titulo;
                listaUl.appendChild(li);
            });
        }
    }
}

new ExploradorPost();