import React, { useState, useEffect} from 'react'
import api from '../service/api'
import { useHistory } from 'react-router-dom';
const { GoogleSpreadsheet } = require('google-spreadsheet')
const creds = require('../service/credentials.json');

function ConfigNovo(props){
    const history = useHistory();
    const [docId, setDocId] = useState('');
    const [updateDocId, setUpadateDocId] = useState('');
    const [dadosConfig, setDadosConfig] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(()=>{
        const fetchData = async()=>{
            const {data} = await api.get("/api/docId")
            setDocId(data)
        }
        const pegarDados = async()=>{
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
            setDadosConfig( colunas )
        
        }

        fetchData();
        pegarDados();
        
        return()=>{
            
        };
    }, []);


    const NovoUsuario = async (nome,email,senha) =>{
        if(nome && email && senha){
            const docConfig = new GoogleSpreadsheet('1cBXuaO0uxvhJVp58HjxRQJ_aEZGqFsv4nzY1M_aeLcw')
            await docConfig.useServiceAccountAuth({
                client_email: creds.client_email,
                private_key: creds.private_key,
            }); 
    
            await docConfig.loadInfo()
    
            const sheet = docConfig.sheetsByIndex[0]; // or use doc.sheetsById[id]
    
            sheet.addRow({nome: nome, email: email, senha: senha}).then((resp)=>{
                alert('Sucesso usuário cadastrado...');
                history.push('/home')
            })
            
        }
    }

    const submitHandler = (e) =>{
        e.preventDefault();
        NovoUsuario(nome,email,senha)    
    }
    const onSubmitArquivo = (e) =>{
        e.preventDefault();
        AtualizarArquivo(updateDocId)
    } 
 
    const AtualizarArquivo = async (idnovo) =>{
        const docConfig = new GoogleSpreadsheet('1cBXuaO0uxvhJVp58HjxRQJ_aEZGqFsv4nzY1M_aeLcw')

        await docConfig.useServiceAccountAuth({
            client_email: creds.client_email,
            private_key: creds.private_key,
        }); 

        await docConfig.loadInfo()

        const sheet = docConfig.sheetsByIndex[0]; // or use doc.sheetsById[id]
        const rows = await sheet.getRows();
        rows[0]._rawData[3] = idnovo
        await rows[0].save().then(()=>{
            alert('Atualizou o link de nova planilha')
            history.push("/home")
        })
        
    }
    const Delete = async (idExcluir) =>{
        const docConfig = new GoogleSpreadsheet('1cBXuaO0uxvhJVp58HjxRQJ_aEZGqFsv4nzY1M_aeLcw')

        await docConfig.useServiceAccountAuth({
            client_email: creds.client_email,
            private_key: creds.private_key,
        }); 

        await docConfig.loadInfo()

        const sheet = docConfig.sheetsByIndex[0]; // or use doc.sheetsById[id]
        const rows = await sheet.getRows();

        await rows[idExcluir].delete().then(()=>{
            alert('Usuário excluido com sucesso....')
            history.push('/home')
        })
    
    }

    return <React.Fragment>
         <div className="perspectiva">
                <div className="analise">
                    <div className="bo-header"> Arquivo Excel</div>
                    <div className="analise-body">
                        <form onSubmit={onSubmitArquivo}>
                            <p> Arquivo atual: {docId}</p>
                            <label htmlFor="idexcel">Alterar Arquivo Excel:</label>
                            <input type="text" id="idexcel" name="idexcel" placeholder="digite o id do arquivo" onChange={(e)=>setUpadateDocId(e.target.value)}></input>
                            <button type="submit" className="btnNovo "> Alterar </button>
                        </form>
                       
                    </div>
                </div>
                <div className="analise">
                    <div className="bo-header"> Usuários</div>
                    <div className="analise-body">
                        {/*<h4>Novo Usuário <i className="fa fa-plus user-novo" onClick={()=>openModal()} ></i></h4>*/}
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
                                    dadosConfig ? 
                                        
                                        dadosConfig.map(coluna=>{
                                            let id = dadosConfig.findIndex(x=>x===coluna)
                                            
                                            return <tr>
                                                
                                                {
                                                    coluna.map(el=>{
                                                        if(el.coluna==="senha"){
                                                            console.log("El: ", el.value, "Tam:" ,el.value.length)
                                                            let carc = "*"
                                                            let mask = ""
                                                            for(let i=0; i<el.value.length;i++){
                                                                mask += carc
                                                            }
                                                            el.value = mask
                                                        }
                                                        return<td>{el.value}</td>    
                                                     })
                                                
                                                }
                                                
                                                <td>
                                                    <button type="button" onClick={()=>Delete(id)} className="btnLixeira"><i  style={{color:"wihte"}}className="fa fa-remove"></i></button>
                                                </td>
                                            </tr>    
                                        })
                                    :
                                    "Carregando...."
                                }                
                            </tbody>
                        </table>
                        <h2>Novo Usuário</h2>
                        <form onSubmit={submitHandler}>
                            <label htmlFor="nome" className="lblNovo">Nome:</label>
                            <input type="text" id="nome" name="nome" onChange={(e)=> setNome(e.target.value)} placeholder="digite o nome"></input>
                            <br></br>
                            <label htmlFor="email" className="lblNovo">Email:</label>
                            <input type="eamil" id="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="digite o email"></input>
                            <br></br>
                            <label htmlFor="senha" className="lblNovo">Senha:</label>
                            <input type="password" id="senha" name="senha" onChange={(e) => setSenha(e.target.value)} placeholder="digite a senha"></input>
                            <br></br>
                            <button type="submit" className=" btnNovo"> Salvar </button>
                        </form>
                    </div>
                </div>
                
            </div>
            
            
    </React.Fragment>
}

export default ConfigNovo