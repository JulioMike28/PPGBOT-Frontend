import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import './App.css';
import Graficos from './Components/Graficos.jsx'
import FormGraficos from './Components/FormGraphic.jsx'
import Perspectiva from './Components/Perspectiva.jsx'
import Relatorio from './Components/Relatorio.jsx'
import Config from './Components/Config.jsx'

function App() {
  const openMenu = ()=>{
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = ()=>{
    document.querySelector(".sidebar").classList.remove("open");
  }
  const exportHTML = ()=>{
    
    var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
         "xmlns:w='urn:schemas-microsoft-com:office:word' "+
         "xmlns='http://www.w3.org/TR/REC-html40'>"+
         "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
    var footer = "</body></html>";
    var sourceHTML = header+document.getElementById("source-html").innerHTML+footer;
    
    var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    var fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    var horario = new Date();
    fileDownload.href = source;
    fileDownload.download = `document - ${horario}.doc`;
    fileDownload.click();
    document.body.removeChild(fileDownload);

    alert('Dados exportados.');
  }
 
  return (
    <BrowserRouter>
      <div id="source-html" style={{display:"none"}}>
        <Relatorio />
      </div>
      <div className="grid-container">
        <header className="header">
            <div className="brand">
                <button onClick={openMenu}>
                    &#9776;
                </button>
            </div>
            <div className="title">
                <center>Respostas do Formulário</center>
            </div>
        </header>
        <aside className="sidebar">
            <h3>Menu</h3>
            <button className="sidebar-close-button" onClick={closeMenu}>Sair</button>
            <button className="sidebar-close-button-up" onClick={closeMenu}>X</button>
            <div >
              <Link to="/respostas">
                <h5 className="export">Ver todas as Respostas</h5>
              </Link>
            </div>
            <div >
              <Link to="/perspectiva">
                <h5 className="export">Perspectiva dos Dados</h5>
              </Link>
            </div>
            <div className="export">
                <h5 className="export" onClick={exportHTML}>Exportar Dados</h5>
            </div>
            <div className="export">
            <Link to="/config">
              <h5 className="export">Configurações</h5>
            </Link>
            </div>
            
        </aside>
        <main className="main">
          
          <Route path="/" exact={true}>        
            <div className="opcoes">
                <div className="opcoes-header">
                      Amostragem dos Dados
                </div>
                <div className="opcoes-body" >
                    <FormGraficos/>
                </div>
            </div>
          </Route>
          <Route path="/perspectiva">
            <Link to="/">
              <h3 className="link">Voltar ao inicio</h3>
            </Link>
            <div className="opcoes">
                <div className="opcoes-header">
                     Perspectiva dos Dados
                </div>
                <div className="opcoes-body">
                    <Perspectiva/>
                </div>
            </div> 
          </Route>
          <Route path="/respostas">
            <Link to="/">
              <h3 className="link">Voltar ao inicio</h3>
            </Link>

            <div className="opcoes">
                <div className="opcoes-header">
                      Todas as Respostas
                </div>
                <div className="opcoes-body">
                    <Graficos/>
                </div>
            </div > 
          </Route>
          <Route path="/config">
            <Link to="/">
              <h3 className="link">Voltar ao inicio</h3>

            </Link>

            <div className="opcoes">
                <div className="opcoes-header">
                      Configurações
                </div>
                <div className="opcoes-body">
                    <Config/>
                </div>
            </div > 
          </Route>
          <Route path="/export">
            <Link to="/">
              <h3 className="link">Voltar ao inicio</h3>
            </Link>
            <Relatorio/>
          </Route>
          
            
          
            
        </main>
        <footer className="footer">
          &#169; Direitos Autorais PPGBOT <br></br>
          Desenvolvido por julio.oliveira@ee.ufcg.edu.br
         </footer>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
