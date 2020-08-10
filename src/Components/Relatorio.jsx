import React, {useState, useEffect}from 'react'
import api from '../service/api'

function Relatorio(props) {
    const [dados, setDados] = useState([])

    useEffect(()=>{
        const fetchData = async()=>{
            const {data} = await api.get("/api/excel")
            setDados(data)
        }
        fetchData()
        return()=>{

        }
    },[])
    return <div>
        <h1> <center>Respostas da Autoavaliação dos Egressos PPGBOT</center></h1>
        {
            dados.forEach(dado=>{
                var i=0;
                return(
                    
                    <div key={i++}>
                        <h2>{dado.coluna}</h2>
                        <h4>{dado.values}</h4>
                    </div>
                )
            })
        }
    </div>
        
    
}

export default Relatorio