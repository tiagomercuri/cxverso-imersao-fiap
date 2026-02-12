
interface Usuario{
    name:string;
}

//função (promessa, usando async/await, try/cath)

async function usuario(id:number): Promise<void>{
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const user :Usuario = await response.json();
        const nomeSpan = document.getElementById("user-name") as HTMLSpanElement

        if(nomeSpan){
            nomeSpan.innerHTML=user.name;
        }
        console.log("usuario carregado", user.name)
    }catch(error){
        console.error("Erro ao buscar usúario",error);
    }
}

usuario(1);


function minhaLocalizacao():void{
    const geoTela = document.getElementById("user-geo") as HTMLSpanElement

    navigator.geolocation.getCurrentPosition(
        (pos: GeolocationPosition)=>{
            const {latitude,longitude}=pos.coords;
            if(geoTela){
                geoTela.innerHTML = `Latitude: ${latitude.toFixed(2)}, Longitude: ${longitude.toFixed(2)}`;
            }
        },
        (err:GeolocationPositionError)=>{
            if(geoTela){
                geoTela.innerText="Acesso negado ou erro no GPS"
            }
            console.error(err.message);
        }
    )
}
(window as any).minhaLocalizacao = minhaLocalizacao;