import React, {useState,useEffect} from 'react'
import {Bar, Pie} from 'react-chartjs-2'
import api from '../service/api'

function Graficos(props) {

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
        {
            dados.map(dado=>{
                let label = []
                let valores= []
                let auxiliar = []
                let chartData={}
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
                
                valores.push(0)
                chartData={
                    labels:label,
                    datasets:[{
                        label: dado.coluna,
                        data: valores,
                        backgroundColor: 'rgba(50,252,50,0.5) ',
                        borderColor: '#32cd32',
                        color:'#22cd22'
                    }]
                } 
               return( <li>
                    <div className="cards">
                        <div className="card">
                            <div className="card-header"><h3>{dado.coluna}</h3> </div>
                            <div className="card-body">
                                <div>
                                    <Bar
                                        data={chartData}
                                        width={70}
                                        height={200}
                                        options={{ maintainAspectRatio: false }}
                                        />
                                </div>
                                <div>
                                    <Pie
                                        data={chartData}
                                        width={70}
                                        height={200}
                                        options={{ maintainAspectRatio: false }}
                                        />
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </li>)
                
            }
            
          
            
            )
        }
    </ul>
}


export default Graficos