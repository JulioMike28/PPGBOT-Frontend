import React,{Component} from 'react'
import Axios from 'axios'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {Bar,Pie} from 'react-chartjs-2'
import 'react-tabs/style/react-tabs.css';

export default class Perpesctiva extends Component{
    constructor(props){
        super(props)

        this.state = {dados:[]}
        this.fetchData()
    }

    fetchData = async()=>{
        const {data} = await Axios.get("/api/excel")
        
        this.setState({...this.state, dados:data})
    }

    fetchAno(dados){
        let labelInicio = []
        let valoresInicio= []
        let auxiliarInicio = []
        let labelTitulacao = []
        let valoresTitulacao= []
        let auxiliarTitulacao = []
        let chartDataAno={}
        
        
        dados.map(dado=>{
          
            if(dado.coluna === "Ano de início no curso do PPGBot:"){
                //Separando os labels - Inicio
                
                for(let i=0; i<dado.values.length;i++){
                    if((dado.values[i]) && !(labelInicio.find(el=> el===dado.values[i]))){     
                        labelInicio.push(dado.values[i])  
                    }
                }
                //Separando os valores - Inicio
                for (let j = 0; j < dado.values.length; j++) {
                    var element = dado.values[j]
                    if(!(auxiliarInicio.find(el=>el===element))){
                        var found = dado.values.filter(el=>el===element)
                        valoresInicio.push(found[0])
                        auxiliarInicio.push(element)
                        found=0
                    }else{

                    }
                }
            }
            if(dado.coluna === "Ano de Titulação:"){
                //Separando os labels - Titulacao
                for(let i=0; i<dado.values.length;i++){
                    if((dado.values[i]) && !(labelTitulacao.find(el=> el===dado.values[i]))){     
                        labelTitulacao.push(dado.values[i])  
                    }
                }
                //Separando os valores -Titulacao
                for (let j = 0; j < dado.values.length; j++) {
                    var element = dado.values[j]
                    if(!(auxiliarTitulacao.find(el=>el===element))){
                        var found = dado.values.filter(el=>el===element)
                        valoresTitulacao.push(found[0])
                        auxiliarTitulacao.push(element)
                        found=0
                    }else{

                    }
                }
            }
        })

        //organizando Labels e valores

        let label = []
        let variavel=[]
        for(let a=0; a<labelInicio.length;a++){
            variavel = labelTitulacao.find(el=>el===labelInicio[a])
            if(variavel){
                label.push(variavel)
            }else{
                label.push(labelInicio[a])
            }
            if((labelTitulacao[a]) && !(label.find(el=>el===labelTitulacao[a]))){
                label.push(labelTitulacao[a])
            }
        }
        
        let labelOrd = label.sort()
       
        let valInicio = []
        let valTitulacao = []
        let found = []
        let foundT = []
        for (let d = 0; d < labelOrd.length; d++) {
            found = valoresInicio.find(el=>el===label[d])
            foundT = valoresTitulacao.find(el=>el===label[d])
            if(found){ 
             
                valInicio.push(found.length)
                found=[]
            }else{
                valInicio.push(0)
                found=[]
            }
            if(foundT){
                valTitulacao.push(foundT.length)
                foundT=[]
            }else{
                valTitulacao.push(0)
                foundT=[]
            }
            found=[]
            foundT=[]
        }
       

        //Preparando chart
        chartDataAno={
            labels:labelOrd,
            datasets:[{
                label: "Ano que início no curso do PPGBot:",
                data: valInicio,
                backgroundColor: 'rgba(50,252,50,0.5) ',
                borderColor: '#32cd32',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
            },{
                label: "Ano de Titulação:",
                data: valTitulacao,
                backgroundColor: 'rgba(255,252,50,0.5) ',
                borderColor: '#ffcd32',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(00,99,255,0.4)',
                hoverBorderColor: 'rgba(00,99,255,1)',
            }]
        }
        return <div>
            <div>
                <Bar
                data={chartDataAno}
                width={700}
                height={350}
                options={{maintainAspectRatio:false}}/>
            </div>
        </div>
    }

    fetchBolsaAgencia(dados){
        let dataBA=[]
        let chartDataBA={}

        
        
        dados.map(dado=>{
  
            if(dado.coluna === "Bolsista:"){
                for (let j = 0; j < dado.values.length; j++) {
                    dataBA.push({valoresBolsa: dado.values[j],valoresAgencia: ''})
                    
                }
            }
            if(dado.coluna === "Agência de Fomento:"){
                for (let j = 0; j < dado.values.length; j++) {
                    dataBA[j].valoresAgencia = dado.values[j]
                    
                }
            }
           
        })

        //Preparando chart
        
        let label=[]
        for (let k = 0; k < dataBA.length; k++) {
            if((dataBA[k].valoresAgencia) && !(label.find(el=>el===dataBA[k].valoresAgencia))){
                label.push(dataBA[k].valoresAgencia)
            }
            
        }
        
     
        let dataValores=[]
        for (let m = 0; m < label.length; m++) {
            var found = dataBA.find(el=>el.valoresAgencia === label[m])
           
            dataValores.push(found.valoresBolsa)
        }
        let val=[]
        dataValores.forEach(el=>{
            if(el === "Sim"){
                val.push(1)
            }else{
                val.push(0)
            }
        })
        console.log(val)
        chartDataBA={
            labels:label,
            datasets:[{
                label: 'Nº de bolsas ' + label ,
                data: val,
                backgroundColor: 'rgba(50,252,50,0.5) ',
                borderColor: '#32cd32',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
            }]
        }
        return <div>
            <div>
                <Pie
                data={chartDataBA}
                width={700}
                height={350}
                options={{maintainAspectRatio:false}}/>
            </div>
        </div>
    }

    render(){
        return(
            <React.Fragment>
                <div className="tabs">
                    <Tabs>
                        <TabList>
                        <Tab>Ano de início - Ano de Titulação</Tab>
                        <Tab>Bolsas - Agência de Fomento</Tab>
                        </TabList>
                    
                        <TabPanel>
                            <div className="perspectiva">
                                <div>
                                    {this.fetchAno(this.state.dados)}
                                </div>
                                <div className="analise">
                                    <div className="bo-header"> Analise dos dados</div>
                                    <div className="analise-body">
                                    Espaço reservado para uma análise escrita dos dados.
                                    </div>
                                </div>
                            </div>
                            
                        </TabPanel>
                        <TabPanel>
                        <div className="perspectiva">
                                <div>
                                    {this.fetchBolsaAgencia(this.state.dados)}
                                </div>
                                <div className="analise">
                                    <div className="bo-header"> Analise dos dados</div>
                                    <div className="analise-body">
                                        Espaço reservado para uma análise escrita dos dados.
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
                
            </React.Fragment>
        )
    }
}