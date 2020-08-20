import React, {useState, useEffect} from 'react'
import api from '../service/api'


function Relatorio(props) {

    const [dados, setDados] = useState([])

    useEffect(()=>{
        const fetchData = async()=>{
            const {data} = await api.get("/api/excel")
            setDados(data)
        }
        fetchData()
        const Timeout= async()=>{
            setTimeout(()=>{
                console.log('Timeout ativado 30s')
                fetchData()
                Timeout()
            },30000)
        }

        Timeout()
        
        return()=>{

        }
    },[])

    return <ul className="cards">
        <h1>Respostas do formulário de Autoavaliação dos Egressos no PPGBOT</h1>
    {
        dados.map(dado=>{
            let label = []
            let valores= []
            let auxiliar = []
            //Separando os labels 
            for(let i=0; i<dado.values.length;i++){
                if((dado.values[i]) &&  !(label.find(el=> el===dado.values[i]))){     
                    label.push(dado.values[i])  
                }
            }
            //Separando os valores
            var found = 0
            for (let j = 0; j < dado.values.length; j++) {
               
                if(!(auxiliar.find(el=>el===dado.values[j]))){
                    found = dado.values.filter(el=>el===dado.values[j])
                    valores.push(found.length)
                    auxiliar.push(dado.values[j])
                }else{

                }   
            }
            
            let percentage = []
            let total = 0
            for (let i = 0; i < valores.length; i++) {
                total = total +  valores[i]
            }
            valores.forEach(el=>{  
                percentage.push((el/total)*100)
            })
             
           return( <li>
                <div className="cards">
                    <div className="card">
                        <div className="card-header"><h3>{dado.coluna}</h3> </div>
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                     <tr>
                                        {label.map(el=><td>{el} (%)</td>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {percentage.map(el=><td>{el} </td>)}
                                    </tr>
                                </tbody>
                            </table>                
                        </div>
                    </div>
                </div>
            </li>)
            
        }
        
      
        
        )
    }
</ul>
        
    
}

export default Relatorio