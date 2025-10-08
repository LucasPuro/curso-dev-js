/*
Regras de Negócio (RN)
Preço por Página: R$ 500,00
Custo Adicional de Design: R$ 1.000,00
Taxa de Urgência: 
   - Menor que 5 dias: 10% sobre o valor base (páginas + design).
   - Menor que 15 dias: 5% sobre o valor base (páginas + design). 
   - 15 dias ou mais, taxa zero.
Desconto: Aplicado sobre a soma de todos os custos únicos (páginas + design + taxa de urgência).
*/

const rnPrecoPorPagina = 500
const rnPrecoAdicionalDesign = 1000

document.querySelector(".seu-nome").textContent = "Lucas Puro Caminhoto"

// Inputs
const inputPaginas = document.querySelector("#qtd-paginas")
const inputPrazo = document.querySelector("#prazo-entrega")
const inputDesconto = document.querySelector("#desconto")
const checkboxDesign = document.querySelector("#inclui-design")

// Views
const resumoSubtotal = document.querySelector("#resumo-subtotal")
const resumoAdicional = document.querySelector("#resumo-adicional")
const resumoUrgencia = document.querySelector("#resumo-urgencia")
const resumoDesconto = document.querySelector("#resumo-desconto")
const resumoTotal = document.querySelector("#resumo-total")

const calcularSubtotal = (quantidade) => quantidade * rnPrecoPorPagina // nrpaginas * 500

function calcularTaxaDeUrgencia(prazo, valor){
   if(prazo > 0 && prazo < 5){
      return valor * 0.1
   } else if(prazo >= 5 && prazo < 15){
      return valor * 0.05
   } else{
      return 0
   }
}

const calcularValorDesconto = (valor, porcentagem) => valor * (porcentagem/100)

// Função que gera o valor total
function gerarValorTotal(){
   const qtdPaginas = Number(inputPaginas.value)
   const prazo = Number(inputPrazo.value)
   const porcentagemDesconto = Number(inputDesconto.value)
   const incluirDesign = checkboxDesign.checked // true ou false

   const subtotal = calcularSubtotal(qtdPaginas)
   const valorDesign = incluirDesign ? rnPrecoAdicionalDesign : 0 // Ternário  ::> (condition ? expressionIfTrue : expressionIfFalse)

   const taxaUrgencia = calcularTaxaDeUrgencia(prazo, (subtotal + valorDesign))

   const valorDesconto = calcularValorDesconto((subtotal + valorDesign + taxaUrgencia), porcentagemDesconto)

   const total = (subtotal + valorDesign + taxaUrgencia) - valorDesconto

   const formatarValores = valor => { //Formata em BRL
      return valor.toLocaleString("pt-BR", {
         style: "currency",
         currency: "BRL"
      })
   }

   resumoSubtotal.textContent = formatarValores(subtotal) //formatarValores aplica a formatação das linhas acima
   resumoAdicional.textContent = formatarValores(valorDesign)
   resumoUrgencia.textContent = "+ " + formatarValores(taxaUrgencia)
   resumoDesconto.textContent = "- " + formatarValores(valorDesconto)
   resumoTotal.textContent = formatarValores(total)
}

// Ação que executa a função e atualiza os campos
// inputPaginas.addEventListener('input', gerarValorTotal)
const todosInputs = [inputPaginas, inputPrazo, inputDesconto, checkboxDesign] //Reúne os inputs em um array
todosInputs.forEach(input => { //Executa a função de gerar valor para cada input no array
   input.addEventListener('input', gerarValorTotal)
})

document.addEventListener('DOMContentLoaded', gerarValorTotal) //Quando carregar o html, executa a função