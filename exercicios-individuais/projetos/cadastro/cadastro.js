/* ARRAY/USUÁRIOS |:._______________________________________________________________*/
    let usuarios = JSON.parse(localStorage.getItem("cadastro_usuarios")) || [] //Converte o JSON string em um objeto se existir, se não cria um array vazio

/* ELEMENTOS |:.____________________________________________________________________*/
    const telaLista = document.querySelector("#tela-lista") //Tela de lista
    const telaCadastro = document.querySelector("#tela-cadastro") //Tela de add
    const btnAdicionar = document.querySelector("#btn-adicionar") //Botão de add
    const btnVoltar = document.querySelector("#btn-voltar-lista") //Botão de voltar

/* INPUTS/USUÁRIO |:._______________________________________________________________*/
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
    let idEmEdicao = null //Facilita a edição
    const formTitulo = document.querySelector("#form-titulo")

// Exemplos de storage do navegador
    //sessionStorage.setItem("teste","Lucas") - Cria informação na sessão
    //sessionStorage.setItem("teste","Lucas") - Cria informação na sessão
    //localStorage.setItem("teste","Lucas") - Cria informação local
    //localStorage.setItem("teste","Lucas") - Cria informação local



/* FUNÇÕES |:.______________________________________________________________________*/
function mostrarTelaLista(){
    telaLista.classList.remove("d-none") //Remove a classe oculta do elemento Lista
    telaCadastro.classList.add("d-none") //Adiciona a classe oculta no elemento Cadasto
    renderizarTabela() //Renderiza a tabela ao mostrar a lista
}

function mostrarTelaCadastro(editar = false){ //Por padrão, a tela é de adicionar user e não de editar
    telaLista.classList.add("d-none") //Adiciona a classe oculta ao elemento Lista
    telaCadastro.classList.remove("d-none") //Remove a classe oculta do elemento Cadasto
    formTitulo.textContent = editar ? "Editar Usuário" : "Adicionar Novo Usuário"
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

    if (idEmEdicao){ //Se o idEmEdicao existe,
        const index = usuarios.findIndex(user => user.id === idEmEdicao) //find traz o objeto, findindex traz somente a posição || Se localiza, retorna a posição, caso contrário retorna -1
        if (index !== -1){
            usuarios[index] = usuario //Pega o array de usuarios na posição X e substitui pelos dados em edição
        }
    } else{
        usuarios.push(usuario) //Manda o usuario para o array de usuarios, como usuário novo
    }
    salvarNoStorage()
    mostrarTelaLista()
    idEmEdicao = null //Reseta o marcador de edição
    form.reset() //Reseta os campos do formulário
}

function salvarNoStorage(){
    localStorage.setItem("cadastro_usuarios",JSON.stringify(usuarios)) //JSON.stringfy transforma o objeto em uma string
}

function editarUsuario(id){
    const user = usuarios.find(user => user.id === id) //Filter filtra e traz um novo array e find traz o item sem trabalhar com o array
    if (!user) return

    idEmEdicao = id //user.id

    

    inputId.value = user.id
    inputNome.value = user.nome
    inputSobrenome.value = user.sobrenome
    inputEmail.value = user.email
    inputCep.value = user.cep
    inputRua.value = user.rua
    inputNumero.value = user.numero
    inputComplemento.value = user.complemento
    inputBairro.value = user.bairro
    inputCidade.value = user.cidade
    inputEstado.value = user.estado
    inputObs.value = user.obs

    mostrarTelaCadastro(true)



}

function excluirUsuario(id){
    if(confirm("Você tem certeza que deseja excluir esse usuário?")){ //Pede confirmação da ação
        // console.log(id)
        usuarios = usuarios.filter(user => user.id !== id) //Exclui o id que for diferente do array de users, salvando uma versão sem o id informado
        salvarNoStorage() //Salva na memória local
        renderizarTabela() //Exibe a tabela
    }
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
    
    tabelaCorpo.addEventListener('click', (event) =>{
        const target = event.target.closest("button") //Clicando em algum lugar, busca o pai do item >> botão/mostra o ID
        //console.log(target)
        if (!target) return //!target se target for falso/nulo  = se existe um botão

        const id = Number(target.dataset.id) //pega todos os atributos que são data.algumacoisa / recupera o id

        if(isNaN(id)) return //true/false se o id for número
        
        if (target.classList.contains("btn-danger")){ //se, na lista de classes, contém danger
            excluirUsuario(id)
        } else if(target.classList.contains("btn-warning")){
            editarUsuario(id)
        }
    })

    mostrarTelaLista() //Já inicia renderizando a tela de lista de usuarios
}

inicializacao()