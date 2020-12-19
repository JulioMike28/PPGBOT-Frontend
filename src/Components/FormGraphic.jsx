import React, { Component } from 'react'
import api from '../service/api'
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
        const {data} = await api.get("/api/excel")
        this.setState({...this.state, dados:data})
        console.log(data);
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
        console.log(dado);
        if(dado.coluna==="Idade com que ingressou no curso do PPGBot:" || dado.coluna==="Ano de início no curso do PPGBot:" || dado.coluna==="Ano de Titulação:" || dado.coluna==="Bolsista:" || dado.coluna==="O que gerou sua pesquisa na pós-graduação:"){
            console.log('entrou');
            let label = []
            let valores= []
            let auxiliar = []
            let valores_mestrado = []
            let valores_doutorado = []
            let labels_reduzido = []

            let chartData={}
              //Separando os labels 
              for(let i=0; i<dado.values.length;i++){
                if((dado.values[i]) &&  !(label.find(el=> el===dado.values[i]))){     
                    label.push(dado.values[i])  
                }
            }
            let label_redu= 0
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

            //Diferencia Mestrado e doutorado
            let id = 0
            dado.nivel.forEach(element => {
                if(element.value==="Apenas Doutorado"){
                    id = dado.nivel.indexOf(element, 0)
                    valores_doutorado.push(valores[id])
                }else{
                    valores_doutorado.push(0)
                }
                if(element.value==="Apenas Mestrado"){
                    id = dado.nivel.indexOf(element, 0)
                    console.log(id);
                    valores_mestrado.push(valores[id])
                }else{
                    valores_mestrado.push(0)
                }
            });

            console.log('valores_doutorado: ', valores_doutorado)
            console.log('valores_mestrado: ',valores_mestrado);

            //Bolsista precisou fazer diferente
            let idB=0
            let contSim =0
            let contNao =0
            if(dado.coluna === "Bolsista:"){
                valores_doutorado = []
                valores_mestrado = []
                labels_reduzido = ["Sim - Mestrado", "Não - Mestrado","Sim - Doutorado", "Não - Doutorado"]
                dado.nivel.forEach(el=>{
                    if(el.value==="Apenas Doutorado"){
                        idB = dado.nivel.indexOf(el, 0)
                        if(dado.values[idB] === "Sim"){
                            valores_doutorado.push(dado.values[idB])
                        }else if(dado.values[idB] === "Não"){
                            valores_doutorado.push(dado.values[idB])
                        } 
                    }else{
                        valores_doutorado.push(0)
                    }
                    if(el.value==="Apenas Mestrado"){
                        idB = dado.nivel.indexOf(el, 0)
                        if(dado.values[idB] === "Sim"){
                            valores_mestrado.push(dado.values[idB])
                        }else if(dado.values[idB] === "Não"){
                            valores_mestrado.push(dado.values[idB])
                        } 
                    }else{
                        valores_mestrado.push(0)
                    }

                })

                valores_doutorado.forEach(el=>{
                    if(el==="Sim"){
                        contSim++
                    }else if(el==="Não"){
                        contNao++
                    }
                })
                valores_doutorado=[0,0,contSim,contNao]
                contSim = 0
                contNao = 0

                valores_mestrado.forEach(el=>{
                    if(el==="Sim"){
                        contSim++
                    }else if(el==="Não"){
                        contNao++
                    }
                })
                valores_mestrado=[contSim, contNao, 0,0]
                contSim = 0
                contNao = 0
                
            }
            console.log('valores_doutorado: ', valores_doutorado);
            console.log('valores_mestrado: ',valores_mestrado);
            valores_doutorado.push(0);
            valores_mestrado.push(0);

            chartData={
                labels:labels_reduzido,
                datasets:[{
                    label: "Mestrado",
                    data: valores_mestrado,
                    backgroundColor: 'rgba(50,252,50,1) ',
                    borderColor: '#32cd32',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                },{
                    label: "Doutorado",
                    data: valores_doutorado,
                    backgroundColor: 'rgba(34,139,34,1) ',
                    borderColor: '#228b22',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(00,99,255,0.4)',
                    hoverBorderColor: 'rgba(00,99,255,1)',
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
                            console.log("-------------->Element Toatal: ",element)
                            if(element){
                                total+=element
                            }else{
                                console.log('element undefined');
                            }
                            
                        });
                        var currentValue = dataset.data[tooltipItem.index];
                        console.log("------------------>CurrenteValue: ",currentValue)
                        console.log("------------------>Total: ",total);
                        var percentage = parseFloat((currentValue/total*100).toFixed(1));
                        console.log("----------------->",percentage);
                        if(percentage >100){
                            percentage=100
                        }
                        return ' (' + percentage + '%)';
                    },
                    title: function(tooltipItem, data) {
                      return data.labels[tooltipItem[0].index];
                    }
                  }
                }
              }
              return <div>
              <div>
              <Bar 
               data={chartData}
               width={70}
               height={185}
               options={option}
              />
              </div> 
              <div>
              <Pie 
               data={chartData}
               width={70}
               height={185}
               options={option}
              />
              </div>
              
          </div>

        }
        if(dado){
            let label = []
            let valores= []
            let auxiliar = []
            let chartData={}
            let labels_reduzido=[]
            let label_redu=0
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
                    borderWidth: 1,
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
            return <div>
                <div>
                <Bar 
                 data={chartData}
                 width={70}
                 height={185}
                 options={option}
                />
                </div> 
                <div>
                <Pie 
                 data={chartData}
                 width={70}
                 height={185}
                 options={option}
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
        let dado = this.state.dados.find(el=>el.coluna===this.state.opcao) || []
       
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
                <div className="bo-header"> Apresentação dos dados - {(this.state.opcao)?this.state.opcao: "nenhum dado escolhido"}   {(this.state.opcao)?<button className="btn-header" style={{marginLeft:"20px"}} ><i className="fa fa-download"></i></button> : ""}</div>
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