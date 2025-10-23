import { useState } from 'react' //useState atualiza o status da variável
import reactLogo from './assets/react.svg' //Logo React, importando pra depois exibir
import viteLogo from '/vite.svg' //Logo Vite
import './App.css' //Importa o css da página
import Titulo from './titulo'

function App() { 
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Titulo titulo="Teste exemplo senai"/>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo"/* Variável js entre {}*/ /> 
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
