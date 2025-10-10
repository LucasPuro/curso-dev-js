// Array com os usuários
    const usuarios = JSON.parse(localStorage.getItem("cadastro_usuarios")) || [] //Converte o JSON string em um objeto se existir, se não cria um array vazio

// Elementos
    const telaLista = document.querySelector("#tela-lista") //Tela de lista
    const telaCadastro = document.querySelector("#tela-cadastro") //Tela de add
    const btnAdicionar = document.querySelector("#btn-adicionar") //Botão de add
    const btnVoltar = document.querySelector("#btn-voltar-lista") //Botão de voltar

// Inputs Usuário
    const inputId = document.querySelector("#user-id")
    const inputNome = document.querySelector("#user-nome")
    const inputSobrenome = document.querySelector("#user-sobrenome")
    const inputEmail = document.querySelector("#user-email")
    const inputCep = document.querySelector("#user-cep")
    const inputRua = document.querySelector("#user-rua")
    const inputNumero = document.querySelector("#user-numero")
    const inputComplemento = document.querySelector("#user-complemento")
    const inputBairro = document.querySelector("#user-bairro")
    const inputCidade = document.querySelector("#user-cidade")
    const inputEstado = document.querySelector("#user-estado")
    const inputObs = document.querySelector("#user-obs") //Transforma os inputs em elementos utilizáveis

    const form = document.querySelector("#user-form")
    const tabelaCorpo = document.querySelector("#user-table-body")

// Exemplos de storage do navegador
    //sessionStorage.setItem("teste","Lucas") - Cria informação na sessão
    //sessionStorage.setItem("teste","Lucas") - Cria informação na sessão
    //localStorage.setItem("teste","Lucas") - Cria informação local
    //localStorage.setItem("teste","Lucas") - Cria informação local



// Funções
function mostrarTelaLista(){
    telaLista.classList.remove("d-none") //Remove a classe oculta do elemento Lista
    telaCadastro.classList.add("d-none") //Adiciona a classe oculta no elemento Cadasto
    renderizarTabela() //Renderiza a tabela ao mostrar a lista
}

function mostrarTelaCadastro(){
    telaLista.classList.add("d-none") //Adiciona a classe oculta ao elemento Lista
    telaCadastro.classList.remove("d-none") //Remove a classe oculta do elemento Cadasto
}

function salvarUsuario(){
    const id = Number(inputId.value)
    const nome = inputNome.value
    const sobrenome = inputSobrenome.value
    const email = inputEmail.value
    const cep = inputCep.value
    const rua = inputRua.value
    const numero = inputNumero.value
    const complemento = inputComplemento.value
    const bairro = inputBairro.value
    const cidade = inputCidade.value
    const estado = inputEstado.value
    const obs = inputObs.value //Pega todos os inputs e transforma em variáveis

    const usuario = {
        id: id || Date.now(), //Transforma a diferença de data de 1970 até HOJE em milisegundos, caso id esteja em branco
        nome, sobrenome, email, cep, rua, numero, complemento, bairro, cidade, estado, obs //Atribui tudo como elemento do objeto
    }

    usuarios.push(usuario) //Manda o usuario para o array de usuarios
    salvarNoStorage() //Chama a função que salvaria no storage
}

function salvarNoStorage(){
    localStorage.setItem("cadastro_usuarios",JSON.stringify(usuarios)) //JSON.stringfy transforma o objeto em uma string
}

function editarUsuario(){

}

function excluirUsuario(){

}

function renderizarTabela(){
    tabelaCorpo.innerHTML = "" //Deixa a tabela vazia quando renderizar
    usuarios.forEach(user => { //Para cada usuario dentro de usuarios, atribui um user
        const tr = document.createElement("tr") //Cria uma const que cria uma linha(tr)
        tr.innerHTML = `
            <td>${user.nome}</td>
            <td>${user.sobrenome}</td>
            <td>${user.email}</td>
            <td>
                <button class="btn btn-sm btn-warning" data-id="${user.id}">Editar</button>
                <button class="btn btn-sm btn-danger" data-id="${user.id}">Excluir</button>
            </td>
        `
        //Muda o HTML interno de cada celula (td) de cada linha
        //A última coluna cria dois botões e vincula ao ID do usuario ao ser acionado
        tabelaCorpo.appendChild(tr) //Adiciona um item filho à tabelaCorpo
    })
}

function inicializacao(){ //Manter por último
    btnAdicionar.addEventListener('click', mostrarTelaCadastro) //Botão add mostra Cadastro
    btnVoltar.addEventListener('click', mostrarTelaLista) //Botão voltar mostra Lista

    form.addEventListener('submit', salvarUsuario) //Quando enviar os dados por submit, executa a função
    
    mostrarTelaLista() //Já inicia renderizando a tela de lista de usuarios
}

inicializacao()