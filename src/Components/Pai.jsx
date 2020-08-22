import React from 'react'
import { BrowserRouter, Route, Link} from 'react-router-dom'


import FormGraficos from './FormGraphic.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Graficos from './Graficos.jsx'
import Perspectiva from './Perspectiva.jsx'
import Config from './Config.jsx'

function Pai() {
    return(
        <BrowserRouter>
            <div className="grid-container">
                <Header />
                <main className="main">
                        <Route path="/home">
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
                            <Link to="/home">
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
                            <Link to="/home">
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
                            <Link to="/home">
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
                </main>
            <Footer />
            </div>
           
        </BrowserRouter>
    )
}

export default Pai