import React, { Component } from 'react'
import api from '../service/api'
const { GoogleSpreadsheet } = require('google-spreadsheet')
const creds = require('../service/credentials.json');

export default class Config extends Component{
    constructor(props){
        super(props)

        this.state = {docId: '',UpdateDocId:'', dadosConfig:[], nome:'', senha:'', email:''}
        this.fetchData()
        this.pegarDados()
        this.handleEmail = this.handleEmail.bind(this)
        this.handleNome = this.handleNome.bind(this)
        this.handleSenha = this.handleSenha.bind(this) 
        this.NovoUsuario = this.NovoUsuario.bind(this)
        this.handleArquivo = this.handleArquivo.bind(this)
    }
    
    fetchData = async()=>{
        const {data} = await api.get("/api/docId")
        this.setState({...this.state, docId:data})
    }

    async pegarDados(){
        let variavel = []
        let colunas=[]
        const docConfig = new GoogleSpreadsheet('1cBXuaO0uxvhJVp58HjxRQJ_aEZGqFsv4nzY1M_aeLcw')

        await docConfig.useServiceAccountAuth({
            client_email: creds.client_email,
            private_key: creds.private_key,
        }); 

        await docConfig.loadInfo()

        const sheet = docConfig.sheetsByIndex[0]; // or use doc.sheetsById[id]
        const rows = await sheet.getRows();
        const header  = await sheet.headerValues;

        let i = 0
        rows.forEach(element => {
            element._rawData.forEach(el =>{
                if(el !== ''){
                    if(header[i] !== 'arquivo'){
                        variavel.push({id: i+1,coluna: header[i], value: el})
                    }
                    
                }else{
                    
                }
                i++
            })
            i=0
        })
        let cont=0
        let elemento=[]
        variavel.forEach(el=>{
            elemento.push(el)
            cont++
            if(cont===3){
                colunas.push(elemento);
                elemento=[]
                cont=0
            }

        })
        console.log('colunas', colunas);
        console.log('dadosConfig', variavel)
        this.setState({...this.state, dadosConfig: colunas })
        
    }

    async NovoUsuario(nome,email,senha){
        if(nome && email && senha){
            const docConfig = new GoogleSpreadsheet('1cBXuaO0uxvhJVp58HjxRQJ_aEZGqFsv4nzY1M_aeLcw')
            await docConfig.useServiceAccountAuth({
                client_email: creds.client_email,
                private_key: creds.private_key,
            }); 
    
            await docConfig.loadInfo()
    
            const sheet = docConfig.sheetsByIndex[0]; // or use doc.sheetsById[id]
    
            sheet.addRow({nome: nome, email: email, senha: senha})
        }
       


    }
    
    handleNome(e){
        this.setState({...this.state, nome: e.target.value})
    }
    handleEmail(e){
        this.setState({...this.state, email: e.target.value})
    }
    handleSenha(e){
        this.setState({...this.state, senha: e.target.value})
    }
    handleArquivo(e){
        this.setState({UpdateDocId: e.target.value})
    }

    async AtualizarArquivo(idnovo){
        const docConfig = new GoogleSpreadsheet('1cBXuaO0uxvhJVp58HjxRQJ_aEZGqFsv4nzY1M_aeLcw')

        await docConfig.useServiceAccountAuth({
            client_email: creds.client_email,
            private_key: creds.private_key,
        }); 

        await docConfig.loadInfo()

        const sheet = docConfig.sheetsByIndex[0]; // or use doc.sheetsById[id]
        const rows = await sheet.getRows();
        rows[0]._rawData[3] = idnovo
        await rows[0].save()
        console.log('atualizou')
    }

    render(){
        return(
            <div className="perspectiva">
                <div className="analise">
                    <div className="bo-header"> Arquivo Excel</div>
                    <div className="analise-body">
                        <p> Arquivo atual: {this.state.docId}</p>
                        <label htmlFor="idexcel">Alterar Arquivo Excel:</label>
                        <input type="text" id="idexcel" name="idexcel" placeholder="digite o id do arquivo" onChange={this.handleArquivo}></input>
                        <button onClick={this.AtualizarArquivo(this.state.UpdateDocId)}> Alterar </button>
                    </div>
                </div>
                <div className="analise">
                    <div className="bo-header"> Usuários</div>
                    <div className="analise-body">
                         <h4>Novo Usuário <a href="#modalNovo"><i className="fa fa-plus user-novo" ></i></a></h4>
                         <div id="modalNovo" className="modal">
                            <a href="#fechar" title="fechar" className="fechar">x</a>
                            <div>
                                <h2>Novo Usuário</h2>
                                <label htmlFor="nome" className="lblNovo">Nome:</label>
                                <input type="text" id="nome" name="nome" onChange={this.handleNome} placeholder="digite o nome"></input>
                                <br></br>
                                <label htmlFor="email" className="lblNovo">Email:</label>
                                <input type="eamil" id="email" name="email" onChange={this.handleEmail} placeholder="digite o email"></input>
                                <br></br>
                                <label htmlFor="senha" className="lblNovo">Senha:</label>
                                <input type="password" id="senha" name="senha" onChange={this.handleSenha} placeholder="digite a senha"></input>
                                <br></br>
                                
                                <button type="button" onClick={this.NovoUsuario(this.state.nome,this.state.email,this.state.senha)} className="btnNovo"> Salvar </button>
                            </div>
                        </div>
                        <table className="table-config">
                            <thead>
                                <tr>
                                    <td>nome</td>
                                    <td>email</td>
                                    <td>senha</td>
                                    <td>ações</td>
                                </tr>
                            </thead>
                            <tbody> 
                                {
                                    this.state.dadosConfig.map(coluna=>{
                                        return <tr>
                                            {coluna.map(el=>{
                                                console.log(el.value)
                                                return<td>{el.value}</td>    
                                            })}
                                            <td>
                                                delete
                                            </td>
                                        </tr>    
                                    })
                                }                
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
            
        )
    }

}