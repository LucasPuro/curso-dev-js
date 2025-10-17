/* ARRAY/USUÁRIOS |:._______________________________________________________________*/
let usuarios = JSON.parse(localStorage.getItem("cadastro_usuarios")) || []

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
    const btnBuscarCep = document.querySelector("#btn-buscar-cep")

    const inputBusca = document.querySelector("#user-busca")

    const btnDownloadJson = document.querySelector("#btn-download-json")
    const btnUploadJson = document.querySelector("#btn-upload-json")
    const uploadJsonInput = document.querySelector("#upload-json-input")

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
    form.reset()
}

function mostrarTelaCadastro(editar = false){ //Por padrão, a tela é de adicionar user e não de editar
    telaLista.classList.add("d-none") //Adiciona a classe oculta ao elemento Lista
    telaCadastro.classList.remove("d-none") //Remove a classe oculta do elemento Cadasto
    formTitulo.textContent = editar === true ? "Editar Usuário" : "Adicionar Novo Usuário" //Se editar for true, coloca editar usuário, senão usa Add novo user
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

function renderizarTabela(usuariosParaRenderizar = usuarios){ //Atribui o valor padrão como o array de usuários
    tabelaCorpo.innerHTML = "" //Deixa a tabela vazia quando renderizar
    usuariosParaRenderizar.forEach(user => { //Para cada usuario dentro de usuarios, atribui um user
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

async function buscarCEP(){ //async define que a função é assíncrona e precisa de um retorno
    const cep = inputCep.value.replace(/\D/g,"") //replace troca tudo que não for número para um espaço em branco => Expressão regular

    if (cep.length === 8){

        try{ //Caso ocorra um erro dentro de try, ele vai para catch
            const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`) //Espera a requisição externa do CEP pelo ViaCEP
            const dados = await resposta.json() //Converte a informação em JSON

            if (!dados.erro){ //Se dados erro é falso (não deu erro) >>> utiliza os dados
                console.log(dados)
                inputRua.value = dados.logradouro
                inputBairro.value = dados.bairro
                inputCidade.value = dados.localidade
                inputEstado.value = dados.estado
            } else{
                alert("CEP Inválido! Tente novamente!")
            }

        } catch (error){ //O que é feito caso dê erro no try
            alert("Erro ao buscar CEP, verifique o número e tente novamente!")
            console.log(error)
        }

    } else{
        alert("CEP Inválido! Digite um CEP com 8 dígitos")
    }
}

function buscarUsuario(){
    //lowercase >> deixa tudo em caixa baixa
    //trim >> remove espaços nas extremidades
    const textoBusca = inputBusca.value.toLowerCase().trim()

    if (textoBusca.length === 0){
        renderizarTabela
        return //Retorna vazio
    }

    const usuariosFiltrados = usuarios.filter(user =>{ //Retorna os usuarios filtrados se o includes abaixo indicar um usuario
        return user.nome.toLowerCase().trim().includes(textoBusca) || user.sobrenome.toLowerCase().trim().includes(textoBusca) || user.email.toLowerCase().trim().includes(textoBusca) //includes verifica se o termo existe no array user.elemento
    })

    renderizarTabela(usuariosFiltrados)

}

function baixarJson(){
    const dados = JSON.stringify(usuarios)
    const blob = new Blob([dados], {type : "application/json"}) //Cria o arquivo usando blob (interface de arquivo)
    const url = URL.createObjectURL(blob) //Cria um objeto de URL com o blob criado
    const link = document.createElement("a") //Cria um elemento de link
    link.href = url //Referência do link é a URL criada com o objeto de URL
    link.download = "usuarios.json" //Torna o link um caminho para download
    link.click() //Clica no link criado
    URL.revokeObjectURL(url) //Destrói a URL criada para o download

} 

function uploadJson(event){ //Define que o event serão as informações passadas para o upload
    const arquivo = event.target.files[0] //Acessa meus arquivos, pegando o inicial
    if (!arquivo) return //Se o arquivo for false/vazio, retorna vazio

    const leitor = new FileReader() //Cria um leitor de arquivos

    leitor.onload = function(e){ //Na leitura/carregamento, executa a função. "e" é o conteúdo do arquivo
        const conteudoArquivo = e.target.result //Atribui o resultado do carregamento do arquivo para essa variável. Pega o JSON e coloca no "conteudoArquivo"

        const usuariosImportados = JSON.parse(conteudoArquivo) //Pega o conteúdo do arquivo e transforma em um objeto

        if (!Array.isArray(usuariosImportados)){ //Se usuariosImportados não for um array>
            alert("O arquivo não possui um array válido!")
        }

        if (confirm("Deseja substituir todos os dados de usuários pelo arquivo importado?")){
            usuarios = usuariosImportados //Array de usuários recebe os usuariosImportados, substituindos os dados
            salvarNoStorage()
            renderizarTabela()
            alert("Usuários importados com sucesso!")
        }
    } 

    leitor.readAsText(arquivo) //Lê o arquivo como texto
}

function inicializacao(){ //Manter por último
    btnAdicionar.addEventListener('click', mostrarTelaCadastro) //Botão add mostra Cadastro
    btnVoltar.addEventListener('click', mostrarTelaLista) //Botão voltar mostra Lista
    btnBuscarCep.addEventListener('click', buscarCEP) //Botão de buscarCEP usa a função de busca CEP

    form.addEventListener('submit', salvarUsuario) //Quando enviar os dados por submit, executa a função
    
    inputBusca.addEventListener("input", buscarUsuario) //Qualquer input na busca já executa a função de buscar

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

    btnDownloadJson.addEventListener('click', baixarJson)

    btnUploadJson.addEventListener('click', () => uploadJsonInput.click()) //Add o click no input de upload ao invés do botão > O botão aciona o input oculto

    uploadJsonInput.addEventListener('change', uploadJson) //Quando o file subir, executa a função

    mostrarTelaLista() //Já inicia renderizando a tela de lista de usuarios
}

inicializacao()