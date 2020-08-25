import React from 'react'
import StoreContext from '../Components/Store/Context'
import { useState} from 'react'
import { useContext } from 'react';
import { useHistory } from 'react-router-dom'
import icon from './images/cabecalho.png'

import { useEffect } from 'react';
const { GoogleSpreadsheet } = require('google-spreadsheet')
const creds = require('../service/credentials.json');

function initialState() {
    return {user: '', password:''}
}





function Login(props) {
    
    const [ values, setValues] = useState(initialState);
    const [ emails, setEmails] = useState('');
    const [ senhas, setSenhas] = useState('');

    const { setToken } = useContext(StoreContext)
    const history = useHistory();

    useEffect(()=>{
        const pegarDados = async()=>{
            let email = []
            let senha = []
            const docConfig = new GoogleSpreadsheet('1cBXuaO0uxvhJVp58HjxRQJ_aEZGqFsv4nzY1M_aeLcw')
        
            await docConfig.useServiceAccountAuth({
                client_email: creds.client_email,
                private_key: creds.private_key,
            }); 
        
            await docConfig.loadInfo()
        
            const sheet = docConfig.sheetsByIndex[0]; // or use doc.sheetsById[id]
            const rows = await sheet.getRows();
            
            rows.forEach(dado=>{
                if(dado.email){
                    email.push(dado.email)
                }
                if(dado.senha){
                    senha.push(dado.senha)
                }
            })
            setEmails(email)
            setSenhas(senha)
        }
        pegarDados();
        return()=>{

        }
    }, [])
    
    function onChange(event) {
        const {value, name} = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    }
    const verificar = ({user, password})=> {

        let userVerificado = emails.filter(x=>x===user)
        let senhaVerificado = senhas.filter(y=>y===password)
    
        console.log(userVerificado)
        console.log(senhaVerificado)
        if(userVerificado && senhaVerificado){
            return {token: '1234'};
        }
        return { error: 'Usuario ou senha invalido'}
    }
    
    function onSubmit(event) {
        event.preventDefault()

        const { token } = verificar(values)

        if(token){
            setToken(token)
            return history.push('/home')
        }

        setValues(initialState);
    }
   
    return(
        <center>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div class="content">      
                <div id="login">
                    <form onSubmit={onSubmit}> 
                        <h1>Login <img src={icon} alt="icon"></img></h1> 
                        <p> 
                            <label for="nome_login">Seu e-mail</label>
                            <input id="nome_login" required="required" type="text" placeholder="ex. contato@htmlecsspro.com" name="user" onChange={onChange} value={values.user}/>
                        </p>
                        
                        <p> 
                            <label for="senha_login">Sua senha</label>
                            <input id="senha_login" required="required" type="password" placeholder="ex. senha" name="password"  onChange={onChange} value={values.password} /> 
                        </p>
                        <p> 
                            <input type="submit" value="Entrar" /> 
                        </p>
                    </form>
                </div>
             </div>
            
        </center>
    )
}

export default Login