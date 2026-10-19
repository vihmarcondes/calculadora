"use strict";


// Seleciona os elementos do HTML.
const formulario = document.querySelector("#formulario");
const campoNumero1 = document.querySelector("#numero1");
const campoNumero2 = document.querySelector("#numero2");
const campoOperacao = document.querySelector("#operacao");
const saida = document.querySelector("#resultado");


// 1. Recebe dois números e retorna a soma.
function somar(a, b) {
  return a + b;
}


// 2. Recebe dois números e retorna a diferença.
function subtrair(a, b) {
  return a - b;
}


// 3. Recebe dois números e retorna o produto.
function multiplicar(a, b) {
  return a * b;
}


// 4. Recebe dois números e retorna o quociente.
// A divisão por zero é verificada na função calcular.
function dividir(a, b) {
  return a / b;
}


// 5. Lê os campos, valida os valores e realiza o cálculo.
function calcular(evento) {
  // Impede que o formulário recarregue a página.
  evento.preventDefault();


  // valueAsNumber obtém o conteúdo dos campos como número.
  // Se o campo estiver vazio, o valor será NaN.
  const numero1 = campoNumero1.valueAsNumber;
  const numero2 = campoNumero2.valueAsNumber;


  // Obtém o texto correspondente à operação selecionada.
  const operacao = campoOperacao.value;


  // Verifica se os dois valores são números finitos.
  if (!Number.isFinite(numero1) || !Number.isFinite(numero2)) {
    saida.textContent = "Preencha os dois campos com números válidos.";


    // Encerra a função, impedindo que o cálculo continue.
    return;
  }


  // Armazena o resultado da operação escolhida.
  let resultado;


  // Escolhe o bloco conforme o valor de operacao.
  switch (operacao) {
    case "somar":
      resultado = somar(numero1, numero2);
      // Sai do switch e continua a função.
      break;


    case "subtrair":
      resultado = subtrair(numero1, numero2);
      break;


    case "multiplicar":
      resultado = multiplicar(numero1, numero2);
      break;


    case "dividir":
      // === compara os valores sem converter seus tipos.
      if (numero2 === 0) {
        saida.textContent = "Não é possível dividir por zero.";
        // Encerra a função antes de realizar a divisão.
        return;
      }
      resultado = dividir(numero1, numero2);
      break;


    default:
      // Executado se nenhuma operação corresponder aos cases.
      saida.textContent = "Operação inválida.";
      return;
  }


  // Verifica se o cálculo ultrapassou o limite numérico.
  if (!Number.isFinite(resultado)) {
    saida.textContent = "O resultado excede o limite numérico permitido.";
    return;
  }


  // Exibe o resultado com a formatação brasileira.
  saida.textContent =
    "Resultado: " +
    resultado.toLocaleString("pt-BR", {
      maximumSignificantDigits: 15
    });
}


// 6. Restaura os campos e a mensagem inicial.
function limpar() {
  // Restaura os valores iniciais do formulário.
  formulario.reset();
  saida.textContent = "O resultado aparecerá aqui.";
  // Posiciona o cursor no primeiro campo.
  campoNumero1.focus();
}


// Executa calcular ao clicar em Calcular ou pressionar Enter.
formulario.addEventListener("submit", calcular);
// Executa limpar ao clicar no botão Limpar.
document.querySelector("#limpar").addEventListener("click", limpar);
