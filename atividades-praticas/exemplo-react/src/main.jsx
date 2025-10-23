import { StrictMode } from 'react' //Mostra erros no código
import { createRoot } from 'react-dom/client' //Biblioteca padrão
import './index.css' //Importa o css padrão do React
import App from './App.jsx' //Importa o componente app > aplicação

createRoot(document.getElementById('root')).render( //Renderiza o elemento por ID dentro do elemento root
  <StrictMode>
    <App />
  </StrictMode>,
)
