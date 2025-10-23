function Titulo({titulo = "Exemplo React"}){ //Parâmetro com chaves como um objeto, definindo um padrão
    return (
        <div className="container">
            <h1 className="text-primary">{titulo}</h1> 
        </div>
    )
}

export default Titulo //Padrão de exportação