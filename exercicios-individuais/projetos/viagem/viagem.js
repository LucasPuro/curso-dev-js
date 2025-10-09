/*---------------------------------
OBJETIVOS
.:Cálculo em tempo real
.:Funções separadas
.:Devolver dados com return
.:
.:Função principal organizadora
---------------------------------
FÓRMULAS
~> total-litros = distancia / consumo
~> custo-total = litros * preco-litro
~> custo-passageiro = custo-total / passageiros
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
const calcularTotalLitros = (valor, porcentagem) => valor * (porcentagem/100)