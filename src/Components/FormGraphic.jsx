import React, { Component } from 'react'
import Axios from 'axios'
import Input from './utils/Input.jsx'
import {Bar, Pie} from 'react-chartjs-2'

export default class FormGraphic extends Component{
    constructor(props){
        super(props)

        this.state = {dados: [],opcao:''}
        this.fetchData()
        this.Timeout()
        this.handleChange = this.handleChange.bind(this)
    }
    
    fetchData = async()=>{
        const {data} = await Axios.get("/api/excel")
        this.setState({...this.state, dados:data})
    }
    Timeout= async()=>{
        setTimeout(()=>{
            console.log('Timeout ativado 30s')
            this.fetchData()
            this.Timeout()
        },30000)
    }

    

    handleChange(e){
        this.setState({...this.state, opcao:e.target.value})
      
    }

    exibir(dado){
        if(dado){
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
            var element = 0
            var found = 0
            for (let j = 0; j < dado.values.length; j++) {
                element = dado.values[j]
                if(!(auxiliar.find(el=>el===element))){
                    found = dado.values.filter(el=>el===element)
                    valores.push(found.length)
                    auxiliar.push(element)
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
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                }]
            } 
            return <div>
                <div>
                <Bar 
                 data={chartData}
                 width={70}
                 height={185}
                 options={{ maintainAspectRatio: false }}
                />
                </div> 
                <div>
                <Pie 
                 data={chartData}
                 width={70}
                 height={185}
                 options={{ maintainAspectRatio: false }}
                />
                </div>
                
            </div>
        }else{
            return <div className="vazio">
                <p >sem dados para exibir.</p>
            </div>
        }
    }
    
    render(){
        let dado = this.state.dados.find(el=>el.coluna===this.state.opcao)
       
        return(
            <div className="perspectiva">
                <div className="button-opcoes">
                    <div className="bo-header"> Escolhar os dados a ser exibido</div>
                    {this.state.dados.map(dado=>{
                        return(
                            <Input 
                                name={dado.coluna}
                                handleChange={this.handleChange}
                            />
                        )
                    })}
                </div>
                <div className="exibicao">
                <div className="bo-header"> Apresentação dos dados - {(this.state.opcao)?this.state.opcao: "nenhum dado escolhido"}</div>
                    {this.exibir(dado)}
                </div>
                {/*<div className="search">
                    <div className="bo-header"> Filtrar Dados</div>
                    <SliderBar/>
                </div>*/}
            </div>
        )
    }

}