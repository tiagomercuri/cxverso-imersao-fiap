// Definindo um contrato(interface) para o objeto cliente
interface Cliente {
    nome: string;
    nascimento: string;
    telefone: string;
}
// selecionar os elementos usando o DOM
const formulario = document.querySelector("#form-cliente") as HTMLFormElement;
const inputNome = document.querySelector("#nome") as HTMLInputElement;
const erro = document.querySelector("#erro-nome") as HTMLSpanElement;

// acessibilidade função de validação em tempo real
formulario.addEventListener('submit', (e:Event)=>{
    // previne o envio do formulário
    e.preventDefault();

    // capturar os valores e tipar como esta na interface cliente
    const dadosCliente:Cliente ={
        nome: inputNome.value,
        nascimento: (document.querySelector("#nascimento") as HTMLInputElement).value,
        telefone: (document.querySelector("#telefone") as HTMLInputElement).value
    };

    // validadão simples(SEO)
    if(dadosCliente.nome.length < 3){
        inputNome.style.borderColor = "red";
        erro.textContent = "O nome deve ter pelo menos 3 caracteres";
        return;
    }

    // if(dadosCliente.nascimento === "" ){
    //     inputNome.style.borderColor = "red";
    //     erro.textContent = "A data de nascimento é obrigatória";
    //     return;
    // }

    // if(dadosCliente.telefone.length < 4 ){
    //     inputNome.style.borderColor = "red";
    //     erro.textContent = "O telefone deve ter pelo menos 4 caracteres";
    //     return;
    // }

    console.log("Enviando dados", dadosCliente);
    alert(`Cliente ${dadosCliente.nome} cadastrado com sucesso!`);

    //limpar o formulário
    formulario.reset();
    erro.textContent = "";
    inputNome.style.borderColor = "";

})


