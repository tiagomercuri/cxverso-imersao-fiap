// // Variáveis  e tipo de dados
// //Case Sensitive - compara letra Maiúscula  de Minúscula

// var nome= "Fiap"; //string
// console.log(typeof nome);
 
// let nome1 = 2026; // number
// console.log( typeof nome1);

// let programador =true; //booleano
// console.log( typeof programador)

// let teste="";//undefined

// let tese2=null; //vazio

// const tecnologias = ["Java","C#","Javascript"]; //Array
// console.log(typeof tecnologias)

// let framework= {};
// console.log(typeof framework)

// // Operadores Matemáticos e Lógicos

// let soma =20 - 5;
// console.log(soma)


// let preco = 10 > 5;
// console.log(preco);

// //strings Literais

// let avatar2 =`${"Fiap"} ${"Caixa"}`;
// console.log(avatar2);


// //estrutura condicionais ( if, if/else, switch,ternario)


// //if
// if(false){
//     console.log("Verdadeiro")
// }

// //if/else

// let horario= 19;

// if(horario < 12){
//     console.log("Manhã")
// }else if( horario > 12 && horario <15){
//     console.log("Tarde")
// }else{
//     console.log("Noite")
// }

// //Switch Case

// let contas ="idoso"

// switch(contas){
//     case "basica":
//         console.log("Conta para iniciante")
//         break;
//     case "intermediaria":
//         console.log("Conta para estudantes")
//         break;
//     case "avanacada":
//         console.log("Conta para empresas")
//         break;
//     default:
//         console.log("Nenhuma das opções")
// }

// //ternario

// let valor =100;

// let resultado = valor == 100 ?"Aumenta":"Não Aumenta"
// console.log(resultado)

// const usuario="caixa1";
// let valida =  usuario === "caixa1" ? "Usuário com sucesso":"Usuario Inválido";
// console.log(valida)

// //estrutura de repetição

// for(let i=0; i<=10; i++){
//  console.log("o valor do i", +i)
// }

// let tecnologias =["Javascript","HTML","CSS"]

// for(let i=0; i<tecnologias.length;i++){
//     console.log(tecnologias[i])
// }

// //while
// let a =10;
// while (a <100){
//     console.log( "O valor de a é" +a);
//     a++;
// }

// //do while
// let y= 0;
// do{
//     console.log("do while",+y)
//     y++;
// }  while(y<10)

// CRIAR UM GAME DE PALPITE

// let palpite;
// // console.log(palpite);
// const sorteio =Math.floor(Math.random() * 10);

// do{
//     palpite = parseInt(prompt("Advinhe o numero entre 1 e 10"));
// } while(palpite !== sorteio);

// alert(`Parabéns! Você acertou o número: ${palpite}`)
// console.log(`Parabéns! Você acertou o número: ${palpite}`)


// imagemTeste- //Camel Case

// ImagemTeste // Pascal Case

// imagem_teste //Snack Case

// imagem-teste //kebab Case


//DOM - DOCUMENT OBJECT MODEL

const imagem = document.createElement('img')

//DEFINIR OS ATRIBUTOS DA IMAGEM
imagem.src="imagem.jpg";
imagem.alt="Imagem de Flores";
imagem.width=300;

//ADICIONA A IMAGEM A UM ELEMENTO EXISTENTE
document.getElementById("imagem").appendChild(imagem)

//MAP, FILTER E REDUCE

//MAP - TRANSFORMAR

//REAJUSTAR TABELA DE PREÇOS DE CARROS

const precosVelho =[5000,8000,1000,1200];

//O MAP RETORNA UM NOVO ARRAY COM OS VALORES ALTERADOS
const precosNovos = precosVelho.map((preco)=>{
    return preco * 2;
})
console.log(precosVelho);


// FILTER - FILTRAR

// FILTRAR CONTAS BANCARIAS COM SALDO NEGATIVO

const clientes =[
    {nome:"Hulk",saldo:1000},
    {nome:"Capitão",saldo:1600},
    {nome:"Arqueiro",saldo:-800},
    {nome:"Homem-Aranha",saldo:-3000},
    {nome:"Homem de Ferro", saldo:4000},
    {nome:"Homem-formiga", saldo:-2500}
];

//O FILTER SÓ MANTER O ITEM SE A CONDIÇÃO FOR VERDADEIRA

const clientesNegativos = clientes.filter((conta)=>{
    return conta.saldo < 0;
})
 console.log(clientesNegativos);

//  REDUCE - REDUZIR

// SOMAR O VALOR TOTAL DE UM PEDIDO

const itensPedido =[
    {produto:"Cadeira Gamer",preco:1000},
    {produto:"Teclado Gamer",preco:800},
    {produto:"Mouse Gamer",preco:300},
    {produto:"Placa de Video Nvidia",preco:9500},
    {produto:"Monitor Curva", preco:4000},
    {produto:"Caneta Inteliente", preco:250}
];

//acumualador -> o valor  que vai somado
//atual -> o item do array

const valorTotal = itensPedido.reduce((soma,atual)=>{
    return soma + atual.preco;
},0); // é onde  a soma começa

console.log("Total a pagar: R$ " +valorTotal);

