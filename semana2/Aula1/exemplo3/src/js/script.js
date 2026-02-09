"use strict";
// selecionar os elementos usando o DOM
const formulario = document.querySelector("#form-cliente");
const inputNome = document.querySelector("#nome");
const erro = document.querySelector("#erro-nome");
// acessibilidade função de validação em tempo real
formulario.addEventListener('submit', (e) => {
    // previne o envio do formulário
    e.preventDefault();
    // capturar os valores e tipar como esta na interface cliente
    const dadosCliente = {
        nome: inputNome.value,
        nascimento: document.querySelector("#nascimento").value,
        telefone: document.querySelector("#telefone").value
    };
    // validadão simples(SEO)
    if (dadosCliente.nome.length < 3) {
        inputNome.style.borderColor = "red";
        erro.textContent = "O nome deve ter pelo menos 3 caracteres";
        return;
    }
    if (dadosCliente.nascimento === "") {
        inputNome.style.borderColor = "red";
        erro.textContent = "A data de nascimento é obrigatória";
        return;
    }
    if (dadosCliente.telefone.length < 4) {
        inputNome.style.borderColor = "red";
        erro.textContent = "O telefone deve ter pelo menos 4 caracteres";
        return;
    }
    console.log("Enviando dados", dadosCliente);
    alert(`Cliente ${dadosCliente.nome} cadastrado com sucesso!`);
    //limpar o formulário
    formulario.reset();
    erro.textContent = "";
    inputNome.style.borderColor = "";
});
