// função (promessa, usando async/await, try/catch)
async function usuario(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const user = await response.json();
        const nomeSpan = document.getElementById("user-name");
        if (nomeSpan) {
            nomeSpan.innerHTML = user.nome;
        }
        console.log("usuario carregado", user.nome);
    }
    catch (erro) {
        console.error("Erro ao buscar usuário", erro);
    }
}
usuario(1);
function minhaLocalizacao() {
    const geoTela = document.getElementById("user-geo");
    navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        if (geoTela) {
            geoTela.innerHTML = `Latitude: ${latitude.toFixed(2)}, Longitude: ${longitude.toFixed(2)}`;
        }
    }, (err) => {
        if (geoTela) {
            geoTela.innerText = "Acesso negado ou erro no GPS";
        }
        console.error(err.message);
    });
}
window.minhaLocalizacao = minhaLocalizacao;
export {};
