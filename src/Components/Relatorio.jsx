import React, {useState, useEffect}from 'react'
import cabecalho from './images/cabecalho.png'
import axios from 'axios'

function Relatorio(props) {
    const [dados, setDados] = useState([])

    useEffect(()=>{
        const fetchData = async()=>{
            const {data} = await axios.get("/api/excel")
            setDados(data)
        }
        fetchData()
        return()=>{

        }
    },[])
    return <div>
        <h1> <center>Respostas da Autoavaliação dos Egressos PPGBOT</center></h1>
        {
            dados.map(dado=>{
                return(
                    <div>
                        <h2>{dado.coluna}</h2>
                        <h4>{dado.values}</h4>
                    </div>
                )
            })
        }
    </div>
        
    
}

export default Relatorio