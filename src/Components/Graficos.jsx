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
                let label_redu =0
                let labels_reduzido=[]
                //Separando os labels 
                for(let i=0; i<dado.values.length;i++){
                    if((dado.values[i]) &&  !(label.find(el=> el===dado.values[i]))){     
                        label.push(dado.values[i])  
                    }
                }
                label.forEach(el=>{
                    if(el.length>30){
                        label_redu = el.substr(0,31)
                        labels_reduzido.push(label_redu)
                    }else{
                        labels_reduzido.push(el)
                    }
                })
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

                let vetor_back = []
                let variavel=0
                let variavel2=0
                let variavel3=0
                let el_back=0
                labels_reduzido.forEach(el=>{
                    variavel = Math.floor(Math.random() * 70)
                    variavel2 = Math.floor(Math.random() * 256)
                    variavel3 = Math.floor(Math.random() * 70)
                    el_back = 'rgba('+variavel+','+variavel2+','+variavel3+') '
                    vetor_back.push(el_back)
                })

                chartData={
                    labels:labels_reduzido,
                    datasets:[{
                        label: dado.coluna,
                        data: valores,
                        backgroundColor: vetor_back,
                        borderColor: '#32cd32',
                        color:'#22cd22',
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                    }]
                }
                const option = {
                    maintainAspectRatio: false ,
                    tooltips: {
                      callbacks: {
                        label: function(tooltipItem, data) {
                            var dataset = data.datasets[tooltipItem.datasetIndex];
                            var total=0
                            dataset.data.forEach(element => {
                                total+=element
                            });
                            var currentValue = dataset.data[tooltipItem.index];
                            var percentage = parseFloat((currentValue/total*100).toFixed(1));
                            return ' (' + percentage + '%)';
                        },
                        title: function(tooltipItem, data) {
                          return data.labels[tooltipItem[0].index];
                        }
                      }
                    }
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
                                        options={option}
                                        />
                                </div>
                                <div>
                                    <Pie
                                        data={chartData}
                                        width={70}
                                        height={200}
                                        options={option}
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