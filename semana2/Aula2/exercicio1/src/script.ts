// Selecionando os elementos do DOM
const formulario = document.getElementById('fb-form') as HTMLFormElement;
const inputNome = document.getElementById('nome') as HTMLInputElement;
const inputEmail = document.getElementById('email') as HTMLInputElement;
const inputMensagem = document.getElementById('mensagem') as HTMLTextAreaElement;
// const msgErro = document.getElementById('msg-erro') as HTMLSpanElement;

// Função para validar e enviar
formulario.addEventListener('submit', (evento: Event) => {
    // Previne o comportamento padrão (recarregar a página)
    evento.preventDefault();

    // Validação do Nome (Mínimo 3 caracteres)
    if (inputNome.value.length < 3) {
        alert("O nome precisa ter pelo menos 3 caracteres.");
        inputNome.focus(); // move o foco para o campo do nome
        return;
    }

    // Validação de E-mail (com Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Verifica se tem texto, @, texto, ponto e texto
    if (!emailRegex.test(inputEmail.value)) { // .test() é a função que verifica se o valor do inputEmail corresponde ao padrão do regex
        alert("Por favor, insira um e-mail válido.");
        inputEmail.focus();
        return;
    }

    // Validação da Mensagem (Mínimo 10 caracteres)
    if (inputMensagem.value.length < 10) {
        alert("A mensagem precisa ter pelo menos 10 caracteres.");
        inputMensagem.focus();
        return;
    }

    // Se passou por todas as validações:
    alert(`Obrigado, ${inputNome.value}! Seu feedback foi enviado com sucesso.`);
    
    // Limpa o formulário após o envio
    formulario.reset();
});