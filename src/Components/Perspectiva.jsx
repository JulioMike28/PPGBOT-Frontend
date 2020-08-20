import React,{Component} from 'react'
import api from '../service/api'
import {Bar,Pie} from 'react-chartjs-2'


export default class Perpesctiva extends Component{
    constructor(props){
        super(props)

        this.state = {dados:[], anoInicio: 0, anoTitulacao: 0, filtrados:[]}
        this.handleChangeAnoTitulacao = this.handleChangeAnoTitulacao.bind(this)
        this.handleChangeAnoInicio = this.handleChangeAnoInicio.bind(this)
        this.filtro = this.filtro.bind(this)
        this.fetchAno = this.fetchAno.bind(this)
        this.fetchBolsaAgencia = this.fetchBolsaAgencia.bind(this)
        this.fetchData()
    }

    fetchData = async()=>{
        const {data} = await api.get("/api/perspectiva")
        
        this.setState({...this.state, dados:data})
    }

    fetchAno(filtrados){
        let label = []
        let valInicio = []
        let contInicio = []
        let cni = 0
        let valTitulacao = []
        let contTitulacao = []
        let chartDataAno = {}

        filtrados.forEach(el=>{
            label.push(el.AnoInicio)
            label.push(el.AnoTitulacao)
            valInicio.push(el.AnoInicio)
            valTitulacao.push(el.AnoTitulacao)
        })
        console.log('Filtrados:', label)
        console.log('valInicio:',valInicio)
        console.log('valTitulacao:',valTitulacao);
        //Label arrumado
        let labelOrd = [ ...new Set(label.sort())]
        //valores

        labelOrd.forEach(el=>{
            
            if(valInicio.find(dado=>dado===el)){
                contInicio.push(1)
            }else{
                contInicio.push(0)
            }

            let qnt = valTitulacao.find(dado=>dado===el)
            if(qnt){
                valTitulacao.forEach(el=>{
                    if(el === qnt){
                        cni++
                    }
                })
                contTitulacao.push(cni)
                cni=0
            }else{
                contTitulacao.push(0)
            }
        })
        
        console.log(contInicio)
        console.log(contTitulacao);
        //Preparando chart
        chartDataAno={
            labels:labelOrd,
            datasets:[{
                label: "Ano que início no curso do PPGBot:",
                data: contInicio,
                backgroundColor: 'rgba(50,252,50,0.5) ',
                borderColor: '#32cd32',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
            },{
                label: "Ano de Titulação:",
                data: contTitulacao,
                backgroundColor: 'rgba(255,252,50,0.5) ',
                borderColor: '#ffcd32',
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
                data={chartDataAno}
                width={400}
                height={350}
                options={option}/>
            </div>
        </div>
    }
    
    fetchBolsaAgencia(dados){
        let labelBA=[]
        let valoresBA=[]
        let chartDataBA={}
        let contCNPQ = 0
        let contFAPERJ = 0
        let contCAPES = 0

        dados.forEach(el=>{
            if(!(labelBA.find(x=>x===el.Agencia))){
                labelBA.push(el.Agencia)
            }
            if(el.Agencia === "CNPq"){
                if(el.Bolsista === "Sim"){
                    contCNPQ++
                }
            }
            if(el.Agencia === "FAPERJ"){
                if(el.Bolsista === "Sim"){
                    contFAPERJ++
                }
            }
            if(el.Agencia === "CAPES"){
                if(el.Bolsista === "Sim"){
                    contCAPES++
                }
            }
        })
        
        valoresBA.push(contCNPQ)
        valoresBA.push(contFAPERJ)
        valoresBA.push(contCAPES)
        contCNPQ = 0
        contFAPERJ=0
        contCAPES=0

       
        chartDataBA={
            labels:labelBA,
            datasets:[{
                label: 'Nº de bolsas ' + labelBA ,
                data: valoresBA,
                backgroundColor: 'rgba(50,252,50,0.5) ',
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
                <Pie
                data={chartDataBA}
                width={400}
                height={350}
                options={option}/>
            </div>
        </div>
    }

    handleChangeAnoInicio(e){
        this.setState({...this.state, anoInicio: e.target.value})
    }
    handleChangeAnoTitulacao(e){
        this.setState({...this.state, anoTitulacao: e.target.value})
    }
    
    filtro(){
        let dadosFiltrados = []
    
        if(this.state.anoInicio && this.state.anoTitulacao){
            var inicio = this.state.anoInicio.split("-");
            var titulacao = this.state.anoTitulacao.split("-");
        }

        this.state.dados.forEach(el=>{
            if((el.AnoInicio >= inicio) && (el.AnoTitulacao <= titulacao)){
                dadosFiltrados.push(el)
            }
        })
        
        console.log('Dados filtrados:',dadosFiltrados)
        this.setState({...this.state, filtrados: dadosFiltrados})
    }

    render(){
        return(
          <React.Fragment>
                {console.log(this.state.anoInicio)}
                <div className="form-pesquisa">
                    <input type="month" id="dataInicial" name="dataInicial" onChange={this.handleChangeAnoInicio}></input>
                    <input type="month" id="dataFinal" name="dataFinal" onChange={this.handleChangeAnoTitulacao}></input>  
                    <button onClick={this.filtro}>Pesquisar</button>
                </div>
                <div className="perspectiva">
                    <div>
                        {this.fetchBolsaAgencia(this.state.filtrados)}
                    </div>
                    <div>
                        {this.fetchAno(this.state.filtrados)}
                    </div>
                    <div className="analise">
                        <div className="bo-header"> Analise dos dados</div>
                        <div className="analise-body">
                            Espaço reservado para uma análise escrita dos dados.
                        </div>
                    </div>
                </div>      
          </React.Fragment>
        )
    }
}