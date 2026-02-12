let nome: string = "Fiap";
let idade: number = 30;
let programador: boolean = true;
console.log(nome);

// função com operadores
function calcular(preco: number, quantidade: number) {
  const total = preco * quantidade;
  return total;
}

function contador() {
  let contagem = 0; // variavel está protegida dentro da função

  return {
    incrementar: (): number => {
      contagem++;
      return contagem;
    },
  };
}

const resultContador = contador();
console.log(resultContador.incrementar());
console.log(resultContador.incrementar());

// Call back function
// callback é uma função passada como argumtento para outra função

// função que recebe uma string e não retorna nada(void)
function usuario(nome: string, callback: (msg: string) => void): void {
  const mensagem = `Usuário ${nome} logado com sucesso!`;
  callback(mensagem); // executa a função enviada apos o processamento
}

usuario("Thor", (resultado) => {
  console.log(resultado);
});

// objetos e interfaces(molde)
// usamos a interface para descrever a estrutura

interface Carro {
  marca: string;
  ano: number;
  modelo: string;
}

const meuCarro: Carro = {
  marca: "Audi",
  ano: 2026,
  modelo: "Audi SX",
};
console.log(meuCarro);

// Criar um projeto livraria que com os atributos (titulo, paginas, autor, disponivel)
// e mostre o resultado mostrando a mensagem que "Cliente (nome) recebeu o livro do autor" usando função a callback

interface livraria {
  titulo: string;
  paginas: number;
  autor: string;
  disponivel: boolean;
}

const livro: livraria = {
  titulo: "JavaScript Avançado",
  paginas: 200,
  autor: "Wellington Silva",
  disponivel: true,
};

function emprestarLivro(nome: string, callback: (msg: string) => void): void {
  const mensagem = `Cliente ${nome} recebeu o livro ${livro.titulo} do autor ${livro.autor}`;
  callback(mensagem);
}

emprestarLivro("Tiago", (resultado) => {
  console.log(resultado);
});
