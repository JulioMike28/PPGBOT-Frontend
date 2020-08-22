import React, {useContext} from 'react'
import Relatorio from './Relatorio.jsx'
import { Link, useHistory} from 'react-router-dom'
import StoreContext from '../Components/Store/Context'

function Header(props) {
    var history = useHistory()
    const { setToken } = useContext(StoreContext)

    const openMenu = ()=>{
        document.querySelector(".sidebar").classList.add("open");
      }
      const closeMenu = ()=>{
        document.querySelector(".sidebar").classList.remove("open");
      }
      const logout = () =>{
        setToken(false)      
        history.push('/')
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
    return(
        <React.Fragment>
            <div id="source-html" style={{display:"none"}}>
                <Relatorio />
            </div>
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
                <button className="sidebar-close-button" onClick={logout}>Logout</button>
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
        </React.Fragment>
    )
}

export default Header