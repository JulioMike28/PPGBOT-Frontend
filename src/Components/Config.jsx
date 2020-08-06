import React, { Component } from 'react'

export default class Config extends Component{
    render(){
        return(
            <div className="perspectiva">
                <div className="analise">
                    <div className="bo-header"> Arquivo Excel</div>
                    <div className="analise-body">
                        Espaço reservado para alterar o caminho do arquivo Excel.
                    </div>
                </div>
                <div className="analise">
                    <div className="bo-header"> Usuários</div>
                    <div className="analise-body">
                        Espaço reservado para alterar funções de usuarios.
                    </div>
                </div>
            </div>
        )
    }

}