import React from 'react'
import StoreContext from '../Components/Store/Context'
import { useState} from 'react'
import { useContext } from 'react';
import { useHistory } from 'react-router-dom'

function initialState() {
    return {user: '', password:''}
}

function  verificar({user, password}) {
    if(user === 'admin' && password === 'admin'){
        return {token: '1234'};
    }
    return { error: 'Usuario ou senha invalido'}
}


function Login(props) {
    const [ values, setValues] = useState(initialState);
    const { setToken } = useContext(StoreContext)
    const history = useHistory();

    function onChange(event) {
        const {value, name} = event.target;
        setValues({
            ...values,
            [name]: value,
        });
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
                        <h1>Login</h1> 
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