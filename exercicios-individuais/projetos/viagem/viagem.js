/*---------------------------------
OBJETIVOS
.:Cálculo em tempo real
.:Funções separadas
.:Devolver dados com return
.:
.:Função principal organizadora
---------------------------------
INPUTS
~distancia
~consumo
~preco-litro
~passageiros

RESULTADOS
>total-litros
>custo-total
>custo-passageiro
---------------------------------
FÓRMULAS
~> total-litros = distancia / consumo
~> custo-total = litros * preco-litro
~> custo-passageiro = custo-total / passageiros
---------------------------------*/

document.querySelector(".seu-nome").textContent = "Lucas Puro Caminhoto"

// Inputs
const inputDistancia = document.querySelector("#distancia")
const inputConsumo = document.querySelector("#consumo")
const inputPrecoLitro = document.querySelector("#preco-litro")
const inputPassageiros = document.querySelector("#passageiros")

// Views
const resultadoTotalLitros = document.querySelector("#total-litros")
const resultadoCustoTotal = document.querySelector("#custo-total")
const resultadoCustoPassageiro = document.querySelector("#custo-passageiro")

// Funções

const calcularTotalLitros = (distancia, consumo) => distancia / consumo

const calcularCustoTotal = (totalLitros, precoLitro) => totalLitros * precoLitro

function gerarCustos(){
    const distancia = Number(inputDistancia.value)
    const consumo = Number(inputConsumo.value)
    const precoLitro = Number(inputPrecoLitro.value)
    const passageiros = Number(inputPassageiros.value)

    const totalLitros = calcularTotalLitros(distancia, consumo).toFixed(1)
    const custoTotal = calcularCustoTotal(totalLitros, precoLitro).toFixed(2)
    const custoPassageiro = (custoTotal / passageiros).toFixed(2)

    // const formatarValores = valor => {
    //   return valor.toLocaleString("pt-BR", {
    //      style: "currency",
    //      currency: "BRL"
    //   })
    // }

    resultadoTotalLitros.textContent = totalLitros + " L"
    resultadoCustoTotal.textContent = "R$ " + custoTotal
    resultadoCustoPassageiro.textContent = "R$ " + custoPassageiro
}

const todosInputs = [inputDistancia, inputConsumo, inputPrecoLitro, inputPassageiros]
todosInputs.forEach(input => {
    input.addEventListener('input', gerarCustos)
})

document.addEventListener('DOMContentLoaded', gerarCustos)