import React, { Component } from 'react'

export default class Config extends Component{
    render(){
        return(
            <div className="perspectiva">
                <div className="analise">
                    <div className="bo-header"> Arquivo Excel</div>
                    <div className="analise-body">
                        <label for="idexcel">ID Arquivo Excel:</label>
                        <input type="text" id="idexcel" name="idexcel"></input>
                        <button> Salvar </button>
                    </div>
                </div>
                <div className="analise">
                    <div className="bo-header"> Usuários</div>
                    <div className="analise-body">
                        Tabela referente a usuários
                    </div>
                </div>
            </div>
        )
    }

}