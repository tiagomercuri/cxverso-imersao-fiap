const botao = document.getElementById('btn-buscar') as HTMLButtonElement;
const inputId = document.getElementById('input-id') as HTMLInputElement;
const container = document.getElementById('resultado') as HTMLDivElement;

async function buscarCitacaoPorId() {
    const id = inputId.value;

    if (!id) {
        alert("Por favor, digite um número!");
        return;
    }

    try {
        container.innerHTML = 'Buscando...';

        const resposta = await fetch(`https://dummyjson.com/quotes/${id}`);


        if (!resposta.ok) {
            throw new Error("Citação não encontrada (ID inexistente)");
        }

        const dado = await resposta.json();

        container.innerHTML = `
            <div class="quote-card">
                <h3>ID Solicitado: ${dado.id}</h3>
                <p style="font-size: 1.2rem"><em>"${dado.quote}"</em></p>
                <hr>
                <p>Autor: <strong>${dado.author}</strong></p>
            </div>
        `;

        console.log("Sucesso:", dado);

    } catch (erro) {
        console.error(erro);
        container.innerHTML = `<p class="erro">Erro: ${(erro as Error).message}</p>`;
    }
}

botao.addEventListener('click', buscarCitacaoPorId);